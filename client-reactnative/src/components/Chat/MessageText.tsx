import React from 'react';
import {Button, Image, Text, View} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useState} from 'react';
import {
  appLinkingUrl,
  commonColors,
  textStyles,
  unv_url,
} from '../../../docs/config';
import ParsedText from 'react-native-parsed-text';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import Communications from 'react-native-communications';
import {getYoutubeMetadata} from '../../helpers/getYoutubeMetadata';
import {getChatLinkInfo, retrieveOtherUserVcard} from '../../xmpp/stanzas';
import {useStores} from '../../stores/context';
import {underscoreManipulation} from '../../helpers/underscoreLogic';
import {observer} from 'mobx-react-lite';
import openChatFromChatLink from '../../helpers/chat/openChatFromChatLink';
import {useNavigation} from '@react-navigation/native';
import {ROUTES} from '../../constants/routes';

const DEFAULT_OPTION_TITLES = ['Call', 'Text', 'Cancel'];
const ytubeLinkRegEx =
  /\b(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gi;
const WWW_URL_PATTERN = /^www\./i;

const textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};
const styles = {
  left: StyleSheet.create({
    container: {},
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
  }),
  right: StyleSheet.create({
    container: {},
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
  }),
};

export const MessageText = observer((props: any) => {
  const [youtubeMetaData, setYoutubeMetaData] = useState({});

  const {loginStore, apiStore, chatStore} = useStores();

  const manipulatedWalletAddress = underscoreManipulation(
    loginStore.initialData.walletAddress,
  );

  const navigation = useNavigation();

  const linkStyle = [
    styles[props.position].link,
    props.linkStyle && props.linkStyle[props.position],
  ];

  const onUrlPress = (url: string) => {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.error('No handler for URL:', url);
        } else {
          Linking.openURL(url);
        }
      });
    }
  };
  const onPhonePress = phone => {
    const {optionTitles} = props;
    const options =
      optionTitles && optionTitles.length > 0
        ? optionTitles.slice(0, 3)
        : DEFAULT_OPTION_TITLES;
    const cancelButtonIndex = options.length - 1;
    // this.context.actionSheet().showActionSheetWithOptions({
    //     options,
    //     cancelButtonIndex,
    // }, (buttonIndex) => {
    //     switch (buttonIndex) {
    //         case 0:
    //             Communications.phonecall(phone, true);
    //             break;
    //         case 1:
    //             Communications.text(phone);
    //             break;
    //         default:
    //             break;
    //     }
    // });
  };
  const onEmailPress = (email: string) =>
    Communications.email([email], null, null, null, null);

  if (props.currentMessage.text.match(ytubeLinkRegEx)) {
    getYoutubeMetadata(props.currentMessage.text.match(ytubeLinkRegEx)[0]).then(
      resp => {
        setYoutubeMetaData(resp.data);
      },
    );
    return (
      <TouchableOpacity
        accessibilityLabel="Open Link"
        onPress={() => onUrlPress(props.currentMessage.text)}
        style={{
          margin: 10,
        }}>
        <ParsedText
          style={[
            styles[props.position].text,
            props.textStyle && props.textStyle[props.position],
            props.customTextStyle,
          ]}
          parse={[
            ...props.parsePatterns(linkStyle),
            {type: 'url', style: linkStyle, onPress: onUrlPress},
            {type: 'phone', style: linkStyle, onPress: onPhonePress},
            {type: 'email', style: linkStyle, onPress: onEmailPress},
          ]}
          childrenProps={{...props.textProps}}>
          {props.currentMessage.text}
        </ParsedText>

        <Text
          color={'white'}
          fontSize={hp('1.3%')}
          fontFamily={textStyles.regularFont}>
          YouTube
        </Text>
        <Text
          fontFamily={textStyles.boldFont}
          fontSize={hp('1.7%')}
          color={'white'}>
          {youtubeMetaData.title}
        </Text>

        <View justifyContent={'center'}>
          <Image
            borderRadius={5}
            alt={'youtube'}
            source={{uri: youtubeMetaData.thumbnail_url}}
            width={hp('40%')}
            height={hp('20%')}
            maxWidth={200}
          />
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, .1)',
              padding: 5,
              left: 65,
              position: 'absolute',
            }}>
            <Ionicons name="open-outline" size={hp('7%')} color="#FFFF" />
          </View>
        </View>
      </TouchableOpacity>
    );
  } else if (
    props.currentMessage.text.includes(unv_url) &&
    props.currentMessage.text.match(
      /\bhttps:\/\/www\.eto\.li\/go\?c=[0-9a-f]+/gm,
    ) &&
    !props.currentMessage.text.includes(
      'https://app-dev.dappros.com/v1/docs/share/',
    )
  ) {
    const chatLink = props.currentMessage.text.match(
      /\bhttps:\/\/www\.eto\.li\/go\?c=[0-9a-f]+/gm,
    )[0];
    const chatJid =
      chatLink?.split('=')[1] + apiStore.xmppDomains.CONFERENCEDOMAIN;

    getChatLinkInfo(manipulatedWalletAddress, chatJid, chatStore.xmpp);

    const handleChatLink = () => {
      openChatFromChatLink(
        chatJid,
        manipulatedWalletAddress,
        navigation,
        chatStore.xmpp,
      );
    };

    return (
      <Button
        alignItems={'center'}
        onPress={handleChatLink}
        shadow={2}
        margin={3}
        backgroundColor={commonColors.primaryColor}>
        <Text
          textAlign={'center'}
          // textDecorationLine={"underline"}
          color={'white'}
          fontSize={hp('2%')}
          fontFamily={textStyles.boldFont}>
          🔗💬{chatStore.chatLinkInfo[chatJid]}
        </Text>
        <Text
          textAlign={'center'}
          color={'white'}
          fontSize={hp('1.3%')}
          fontFamily={textStyles.lightFont}>
          (tap to open room)
        </Text>
      </Button>
    );
  } else if (
    props.currentMessage.text.includes(
      'https://app-dev.dappros.com/v1/docs/share/',
    )
  ) {
    const doclink = props.currentMessage.text;
    return (
      <View margin={3}>
        <Text
          color={'white'}
          fontWeight={'bold'}
          fontFamily={textStyles.boldFont}>
          🔗📄Document
        </Text>
        <Text
          color={'white'}
          fontSize={hp('1.3%')}
          fontFamily={textStyles.lightFont}>
          (tap to view document)
        </Text>
        {/* <Text
        fontFamily={textStyles.regularFont}
        >{props.currentMessage.text}</Text> */}
        <ParsedText
          style={[
            styles[props.position].text,
            props.textStyle && props.textStyle[props.position],
            props.customTextStyle,
          ]}
          parse={[
            ...props.parsePatterns(linkStyle),
            {type: 'url', style: linkStyle, onPress: onUrlPress},
            {type: 'phone', style: linkStyle, onPress: onPhonePress},
            {type: 'email', style: linkStyle, onPress: onEmailPress},
          ]}
          childrenProps={{...props.textProps}}>
          {doclink}
        </ParsedText>
      </View>
    );
  } else if (
    props.currentMessage.text.includes(unv_url) &&
    props.currentMessage.text.includes('profileLink')
  ) {
    const params = props.currentMessage.text.split(appLinkingUrl)[1];
    const queryParams = new URLSearchParams(params);
    const firstName: string = queryParams.get('firstName');
    const lastName: string = queryParams.get('lastName');
    const xmppId: string = queryParams.get('xmppId');
    const walletAddressFromLink: string = queryParams.get('walletAddress');
    const linkToken = queryParams.get('linkToken');

    const handleProfileOpen = () => {
      if (loginStore.initialData.walletAddress === walletAddressFromLink) {
        navigation.navigate(ROUTES.PROFILE);
      } else {
        setTimeout(() => {
          retrieveOtherUserVcard(
            loginStore.initialData.xmppUsername,
            xmppId,
            chatStore.xmpp,
          );

          loginStore.setOtherUserDetails({
            anotherUserFirstname: firstName,
            anotherUserLastname: lastName,
            anotherUserLastSeen: {},
            anotherUserWalletAddress: walletAddressFromLink,
          });
        }, 2000);
        navigation.navigate(ROUTES.OTHERUSERPROFILESCREEN, {
          linkToken: linkToken,
        });
      }
    };

    return (
      <Button
        alignItems={'center'}
        onPress={handleProfileOpen}
        shadow={2}
        margin={3}
        backgroundColor={commonColors.primaryColor}>
        <Text
          textAlign={'center'}
          // textDecorationLine={"underline"}
          color={'white'}
          fontSize={hp('2%')}
          fontFamily={textStyles.boldFont}>
          🔗👤{firstName + ' ' + lastName}
        </Text>
        <Text
          textAlign={'center'}
          color={'white'}
          fontSize={hp('1.3%')}
          fontFamily={textStyles.lightFont}>
          (tap to view profile)
        </Text>
      </Button>
    );
  } else {
    return (
      <ParsedText
        style={[
          styles[props.position].text,
          props.textStyle && props.textStyle[props.position],
          props.customTextStyle,
        ]}
        parse={[
          ...props.parsePatterns(linkStyle),
          {type: 'url', style: linkStyle, onPress: onUrlPress},
          {type: 'phone', style: linkStyle, onPress: onPhonePress},
          {type: 'email', style: linkStyle, onPress: onEmailPress},
        ]}
        childrenProps={{...props.textProps}}>
        {props.currentMessage.text}
      </ParsedText>
    );
  }
});
