import {client, xml} from '@xmpp/client';
import {format} from 'date-fns';
import {action, makeAutoObservable, runInAction, toJS} from 'mobx';
import {defaultChats} from '../../docs/config';
import {
  addChatRoom,
  getChatRoom,
  getRoomList,
} from '../components/realmModels/chatList';
import {
  getAllMessages,
  insertMessages,
  updateMessageToWrapped,
  updateTokenAmount,
} from '../components/realmModels/messages';
import {asyncStorageConstants} from '../constants/asyncStorageConstants';
import {asyncStorageGetItem} from '../helpers/cache/asyncStorageGetItem';
import {asyncStorageSetItem} from '../helpers/cache/asyncStorageSetItem';
import {createMessageObject} from '../helpers/chat/createMessageObject';
import {playCoinSound} from '../helpers/chat/playCoinSound';
import {underscoreManipulation} from '../helpers/underscoreLogic';
import {
  getBlackList,
  getUserRoomsStanza,
  presenceStanza,
  subscribeStanza,
  subscribeToRoom,
  updateVCard,
  vcardRetrievalRequest,
} from '../xmpp/stanzas';
import {XMPP_TYPES} from '../xmpp/xmppConstants';
import {RootStore} from './context';

interface recentRealtimeChatProps {
  avatar?: string;
  createdAt: any;
  message_id: string;
  name?: string;
  room_name: string;
  text: string;
  user_id?: string;
  system: boolean;
  shouldUpdateChatScreen: boolean;
  mimetype?: string;
  tokenAmount?: string;
  image?: string;
  realImageURL?: string;
  isStoredFile?: boolean;
  size?: string;
  duration?: any;
  waveForm?: any;
}

interface roomListProps {
  name: string;
  participants: number;
  avatar: string;
  jid: string;
  counter: number;
  lastUserText: string;
  lastUserName: string;
  createdAt: string;
  priority?: number;
  muted?: boolean;
  isFavourite?: boolean;
}

interface isComposingProps {
  state: boolean;
  username: string;
  manipulatedWalletAddress: string;
  chatJID: string;
}

interface defaultChatProps {
  name: string;
  premiumOnly: boolean;
  stickyOrder: boolean;
  removable: boolean;
}

interface replyProps {
  messageID: string;
  message: string;
  isReply: boolean;
}

interface roomMemberInfoProps {
  ban_status: string;
  jid: string;
  last_active: string;
  name: string;
  profile: string;
  role: string;
}

export class ChatStore {
  messages: any = [];
  xmpp: any = null;
  xmppError: any = '';
  roomList: roomListProps | [] = [];
  stores: RootStore | {} = {};
  roomsInfoMap: any = {};
  chatLinkInfo: any = {};
  blackList = [];
  allMessagesArrived: boolean = false;
  recentRealtimeChat: recentRealtimeChatProps = {
    createdAt: undefined,
    message_id: '',
    room_name: '',
    text: '',
    system: false,
    shouldUpdateChatScreen: false,
  };
  shouldCount: boolean = true;
  roomRoles = {};
  isOnline = false;
  isLoadingEarlierMessages = false;
  isComposing: isComposingProps = {
    state: false,
    username: '',
    manipulatedWalletAddress: '',
    chatJID: '',
  };
  replyData: replyProps = {
    messageID: '',
    message: '',
    isReply: false,
  };

  roomMemberInfo = [];

  constructor(stores: RootStore) {
    makeAutoObservable(this);
    this.stores = stores;
  }

  toggleShouldCount = (value: boolean) => {
    runInAction(() => {
      this.shouldCount = value;
    });
  };

  setInitialState = () => {
    runInAction(() => {
      this.messages = [];
      this.xmpp = null;
      this.xmppError = '';
      this.roomList = [];
      this.roomsInfoMap = {};
      this.allMessagesArrived = false;
      this.recentRealtimeChat = {
        createdAt: undefined,
        message_id: '',
        room_name: '',
        text: '',
        system: false,
        shouldUpdateChatScreen: false,
      };
      this.shouldCount = true;
      this.roomRoles = {};
      this.isComposing = {
        state: false,
        username: '',
        manipulatedWalletAddress: '',
        chatJID: '',
      };
    });
  };

  setRoomRoles = (jid: string, role: string) => {
    runInAction(() => {
      this.roomRoles[jid] = role;
    });
  };

  xmppConnect = (username: string, password: string) => {
    runInAction(() => {
      this.xmpp = client({
        service: this.stores.apiStore.xmppDomains.SERVICE,
        domain: this.stores.apiStore.xmppDomains.DOMAIN,
        username,
        password,
      });
    });
    this.xmpp.start().catch(console.log);
  };
  getRoomsFromCache = async () => {
    try {
      const rooms: roomListProps = await getRoomList();
      runInAction(() => {
        this.roomList = rooms;
      });
    } catch (error) {}
  };
  getCachedMessages = async () => {
    const messages = await getAllMessages();
    runInAction(() => {
      this.messages = messages;
    });
  };
  getCachedRoomsInfo = async () => {
    const res = await asyncStorageGetItem(
      asyncStorageConstants.roomsListHashMap,
    );
    if (res) {
      runInAction(() => {
        this.roomsInfoMap = res;
      });
    }
  };

  updateRoomInfo = async (jid: string, data: any) => {
    runInAction(() => {
      this.roomsInfoMap[jid] = {...this.roomsInfoMap[jid], ...data};
    });
    await asyncStorageSetItem(
      asyncStorageConstants.roomsListHashMap,
      this.roomsInfoMap,
    );
  };

  addMessage = (message: any) => {
    runInAction(() => {
      this.messages.push(message);
    });
  };
  addRoom = (room: any) => {
    runInAction(() => {
      this.roomList.push(room);
    });
  };
  setRooms = (roomsArray: any) => {
    runInAction(() => {
      this.roomList = roomsArray;
    });
  };
  updateMessageProperty = (messageId, property, value) => {
    const messages = toJS(this.messages);
    const index = messages.findIndex(item => item._id === messageId);

    if (index !== -1) {
      const message = {
        ...JSON.parse(JSON.stringify(messages[index])),
        [property]:
          property === 'tokenAmount'
            ? messages[index][property] + value
            : value,
      };
      runInAction(() => {
        this.messages[index] = message;
      });
    }
  };

  updateBadgeCounter = (roomJid: string, type: 'CLEAR' | 'UPDATE') => {
    this.roomList.map((item: any, index: number) => {
      if (item.jid === roomJid) {
        if (type === 'CLEAR') {
          runInAction(() => {
            // item.counter = 0;
            // this.roomsInfoMap[roomJid].counter = 0
          });
        }
        if (type === 'UPDATE') {
          runInAction(() => {
            // item.counter++;
            // this.roomsInfoMap[roomJid].counter = item.counter;
          });
        }
      }
    });
  };

  updateMessageComposingState = (props: isComposingProps) => {
    runInAction(() => {
      this.isComposing = props;
    });
  };

  updateAllRoomsInfo = async () => {
    let map = {};
    this.roomList.forEach(item => {
      const latestMessage = this.messages
        .filter(message => item.jid === message.roomJid)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];

      if (latestMessage) {
        map[latestMessage?.roomJid] = {
          ...this.roomsInfoMap[latestMessage?.roomJid],

          lastUserName: latestMessage?.user.name,
          lastUserText: latestMessage?.text,
          muted: this.roomsInfoMap[item.jid]?.muted,

          lastMessageTime:
            latestMessage.createdAt && format(latestMessage.createdAt, 'hh:mm'),
        };
      }
      if (!latestMessage) {
        map[item.jid] = this.roomsInfoMap[item.jid];
      }
    });
    runInAction(() => {
      this.roomsInfoMap = map;
    });
    await asyncStorageSetItem(
      asyncStorageConstants.roomsListHashMap,
      this.roomsInfoMap,
    );
  };
  setChatMessagesLoading = value => {
    runInAction(() => {
      this.isLoadingEarlierMessages = value;
    });
  };
  subscribeToDefaultChats = () => {
    Object.entries(defaultChats).forEach(([key, value]) => {
      const jid = key + this.stores.apiStore.xmppDomains.CONFERENCEDOMAIN;
      const manipulatedWalletAddress = underscoreManipulation(
        this.stores.loginStore.initialData.walletAddress,
      );
      subscribeToRoom(jid, manipulatedWalletAddress, this.xmpp);
    });
  };

  xmppListener = async () => {
    let archiveRequestedCounter = 0;
    const xmppUsername = underscoreManipulation(
      this.stores.loginStore.initialData.walletAddress,
    );
    // xmpp.reconnect.start();
    this.xmpp.on('stanza', async (stanza: any) => {
      //capture room info
      if (stanza.attrs.id === 'roomInfo') {
        runInAction(() => {
          this.chatLinkInfo[stanza.attrs.from] =
            stanza.children[0].children[0].attrs.name;
        });
      }
      if (stanza.attrs.id === XMPP_TYPES.setRoomImage) {
        console.log(
          stanza.children[0].attrs,
          stanza.children[0].children,
          stanza,
        );
        getUserRoomsStanza(xmppUsername, this.xmpp);
      }
      this.stores.debugStore.addLogsXmpp(stanza);
      if (stanza.attrs.id === XMPP_TYPES.otherUserVCardRequest) {
        let anotherUserAvatar = '';
        let anotherUserDescription = '';
        stanza.children[0].children.map((item: any) => {
          if (item.name === 'DESC') {
            anotherUserDescription = item.children[0];
          }
          if (item.name === 'PHOTO') {
            anotherUserAvatar = item.children[0].children[0];
          }
        });
        this.stores.otherUserStore.setDataFromVCard(
          anotherUserDescription,
          anotherUserAvatar,
        );
      }
      if (
        stanza.attrs.id === XMPP_TYPES.paginatedArchive &&
        stanza.children[0].name === 'fin'
      ) {
        runInAction(() => {
          this.isLoadingEarlierMessages = false;
        });
      }

      if (
        stanza.attrs.id === 'GetArchive' &&
        stanza.children[0].name === 'fin'
      ) {
        archiveRequestedCounter += 1;
        if (archiveRequestedCounter === this.roomList.length) {
          this.updateAllRoomsInfo();
        }

        this.getCachedMessages();
      }

      if (stanza.attrs.id === XMPP_TYPES.vCardRequest) {
        const {photo, firstName, lastName} = this.stores.loginStore.initialData;
        let fullName = firstName + ' ' + lastName;
        let profilePhoto = photo;
        let profileDescription = 'No description';
        if (!stanza.children[0].children.length) {
          updateVCard(photo, profileDescription, fullName, this.xmpp);
        } else {
          stanza.children[0].children.map((item: any) => {
            if (item.name === 'DESC') {
              profileDescription = item.children[0];
            }
            if (item.name === 'URL') {
              profilePhoto = item.children[0];
            }
          });
          this.stores.loginStore.updateUserPhotoAndDescription(
            profilePhoto,
            profileDescription,
          );
        }
      }

      if (stanza.attrs.id === XMPP_TYPES.roomMemberInfo) {
        if (stanza.children[0].children.length) {
          this.roomMemberInfo = stanza.children[0].children.map(
            item => item.attrs,
          );
        }
      }

      if (stanza.attrs.id === XMPP_TYPES.roomPresence) {
        let roomJID = stanza.attrs.from.split('/')[0];
        let userJID = stanza.attrs.from.split('/')[1];

        let role = stanza.children[1].children[0].attrs.role;
        this.setRoomRoles(roomJID, role);
      }

      if (stanza.attrs.id === XMPP_TYPES.updateVCard) {
        if (stanza.attrs.type === 'result') {
          vcardRetrievalRequest(xmppUsername, this.xmpp);
        }
      }

      //to catch error
      if (stanza.attrs.type === 'error') {
        stanza.children.filter(item => {
          if (item.name === 'error') {
            console.log(item.children, 'stanza error==============');
          }
        });
      }

      if (stanza.attrs.id === XMPP_TYPES.createRoom) {
        getUserRoomsStanza(xmppUsername, this.xmpp);
      }

      if (stanza.attrs.id === 'activity') {
        console.log(stanza.children[0].children, 'activityyyy');
      }

      if (stanza.attrs.id === XMPP_TYPES.getUserRooms) {
        const roomsArray: any = [];
        const rosterFromXmpp = stanza.children[0].children;
        rosterFromXmpp.forEach((item: any) => {
          const rosterObject = {
            name: item.attrs.name,
            jid: item.attrs.jid,
            participants: +item.attrs.users_cnt,
            avatar: 'https://placeimg.com/140/140/any',
            counter: 0,
            lastUserText: '',
            lastUserName: '',
            createdAt: new Date(),
            priority: 0,
            roomThumbnail:
              item.attrs.room_thumbnail === 'none'
                ? ''
                : item.attrs.room_thumbnail,
            roomBackground:
              item.attrs.room_background === 'none'
                ? ''
                : item.attrs.room_background,
          };

          presenceStanza(xmppUsername, item.attrs.jid, this.xmpp);

          getChatRoom(item.attrs.jid).then(cachedChat => {
            if (!cachedChat) {
              addChatRoom(rosterObject);
              this.updateRoomInfo(item.attrs.jid, {
                name: item.attrs.name,
                participants: +item.attrs.users_cnt,
              });
            }
            if (
              cachedChat?.jid &&
              (+cachedChat.participants !== +item.attrs.users_cnt ||
                cachedChat.name !== item.attrs.name)
            ) {
              this.updateRoomInfo(item.attrs.jid, {
                name: item.attrs.name,
                participants: +item.attrs.users_cnt,
              });
            }
          });

          roomsArray.push(rosterObject);

          //insert the list of rooms in realm
          // insertRosterList(rosterObject);
        });
        this.setRooms(roomsArray);
        // await AsyncStorage.setItem('roomsArray', JSON.stringify(roomsArray));
      }
      if (stanza.attrs.id === XMPP_TYPES.getBlackList) {
        const blackList = stanza.children[0].children.map(item => ({
          userJid: item.attrs.user,
        }));
        runInAction(() => {
          this.blackList = blackList;
        });
      }
      if (
        stanza.attrs.id === XMPP_TYPES.addToBlackList ||
        stanza.attrs.id === XMPP_TYPES.removeFromBlackList
      ) {
        getBlackList(xmppUsername, this.xmpp);
      }

      if (stanza.is('iq') && stanza.attrs.id === XMPP_TYPES.newSubscription) {
        presenceStanza(xmppUsername, stanza.attrs.from, this.xmpp);
        const room = await getChatRoom(stanza.attrs.from);
        if (!room) {
          getUserRoomsStanza(xmppUsername, this.xmpp);
        }
      }
      if (stanza.is('message')) {
        //capture message composing
        if (
          stanza?.children[0]?.children[0]?.children[0]?.children[2]
            ?.children[0]?.name === 'invite'
        ) {
          let jid =
            stanza?.children[0]?.children[0]?.children[0]?.children[3]?.attrs
              ?.jid;
          subscribeStanza(xmppUsername, jid, this.xmpp);
          presenceStanza(xmppUsername, jid, this.xmpp);
        }
        if (stanza?.children[2]?.children[0]?.name === 'invite') {
          const jid = stanza.children[3].attrs.jid;
          subscribeStanza(xmppUsername, jid, this.xmpp);
        }

        if (stanza?.children[2]?.children[0]?.name === XMPP_TYPES.invite) {
          const jid = stanza.children[3].attrs.jid;
          subscribeStanza(xmppUsername, jid, this.xmpp);
          getUserRoomsStanza(xmppUsername, this.xmpp);
        }

        //capture archived message of a room
        if (stanza.children[0].attrs.xmlns === 'urn:xmpp:mam:2') {
          const singleMessageDetailArray =
            stanza.children[0].children[0].children[0].children;

          const roomJID = stanza.attrs.from;
          const message = createMessageObject(singleMessageDetailArray);
          if (
            this.blackList.find(item => item.userJid === message.user._id)
              ?.userJid
          ) {
            return;
          }

          if (message.system) {
            if (message?.contractAddress) {
              await updateMessageToWrapped(message.receiverMessageId, {
                nftId: message.nftId,
                contractAddress: message.contractAddress,
              });
            }
            await updateTokenAmount(
              message.receiverMessageId,
              message.tokenAmount,
            );
          }
          const messageAlreadyExist = this.messages.findIndex(
            x => x._id === message._id,
          );
          if (messageAlreadyExist === -1) {
            this.addMessage(message);
            insertMessages(message);
          }
        }

        if (stanza.attrs.id === XMPP_TYPES.sendMessage) {
          const messageDetails = stanza.children;
          const message = createMessageObject(messageDetails);

          if (
            this.blackList.find(item => item.userJid === message.user._id)
              ?.userJid
          ) {
            console.log('finded user');
            return;
          }
          if (this.shouldCount) {
            this.updateBadgeCounter(message.roomJid, 'UPDATE');
          }
          this.addMessage(message);

          this.updateRoomInfo(message.roomJid, {
            lastUserText: message?.text,
            lastUserName: message?.user?.name,
            messageTime:
              message?.createdAt && format(message?.createdAt, 'hh:mm'),
          });
          if (message.system) {
            if (message?.contractAddress) {
              await updateMessageToWrapped(message.receiverMessageId, {
                nftId: message.nftId,
                contractAddress: message.contractAddress,
              });
              this.updateMessageProperty(
                message.receiverMessageId,
                'nftId',
                message.nftId,
              );
            }
            this.updateMessageProperty(
              message.receiverMessageId,
              'tokenAmount',
              message.tokenAmount,
            );
            await updateTokenAmount(
              message.receiverMessageId,
              message.tokenAmount,
            );
            playCoinSound(message.tokenAmount);
          }
          insertMessages(message);
        }

        //capture message composing
        if (stanza.attrs.id === XMPP_TYPES.isComposing) {
          const chatJID = stanza.attrs.from.split('/')[0];

          const fullName = stanza.children[1].attrs.fullName;
          const manipulatedWalletAddress =
            stanza.children[1].attrs.manipulatedWalletAddress;
          this.updateMessageComposingState({
            state: true,
            username: fullName,
            manipulatedWalletAddress,
            chatJID,
          });
        }

        //capture message composing paused
        if (stanza.attrs.id === XMPP_TYPES.pausedComposing) {
          const chatJID = stanza.attrs.from.split('/')[0];
          const manipulatedWalletAddress =
            stanza.children[1].attrs.manipulatedWalletAddress;
          this.updateMessageComposingState({
            state: false,
            manipulatedWalletAddress,
            chatJID,
            username: '',
          });
        }
      }
    });

    this.xmpp.on('online', async address => {
      const {firstName, lastName, photo} = this.stores.loginStore.initialData;
      this.xmpp.reconnect.delay = 2000;
      this.xmpp.send(xml('presence'));
      this.subscribeToDefaultChats();
      runInAction(() => {
        this.isOnline = true;
      });
      getUserRoomsStanza(xmppUsername, this.xmpp);
      getBlackList(xmppUsername, this.xmpp);
      // updateVCard(photo, null, firstName + ' ' + lastName, this.xmpp);
      vcardRetrievalRequest(xmppUsername, this.xmpp);
    });
  };
}