/**
 * module dependecies
 */
import { useEffect, useReducer, useState } from "react";
import { useHistory } from 'react-router-dom'
import { SlideBar } from "./slidebar";
import { ChatContent } from "./chatcontent"
import domain from "../../config/domain";
import { ResponsesiveContext, NotificationContext, ChatContext, DialogContext, ControleCurrenRoomContext, NewMessageContext } from "./context"
import socketIO from "../../controller/socketIO";
import Dialog from "./dialog"
import "./css/chatbox.css"
import { User } from "../../controller/userController";
import AvatarEditor from "./AvatarEditor"
/**
 * Private variable
 */
// initial state responsive context
// ------------------------------------------------------------------
const initialState = {
	screenType: undefined,
	mobileProperties: {
		slidebar: undefined,
		content: undefined
	}
}
// acction to handle ResponsiveContext module
const actions = {
	turn_pc_mode: "TURN-PC-MODE",
	turn_mobile_slide_bar: "TURN-MOBILE-SLIDE-BAR",
	turn_mobile_chatbox: "TURN-MOBILE-CHATBOX",
	clear: "CLEAR-DATA"
}
// reducer to handle ResponsiveContext module
const reducer = (state, action) => {
	switch (action.type) {
		case actions.turn_pc_mode:
			return {
				screenType: "pc",
				mobileProperties: {
					slidebar: undefined,
					content: undefined
				}
			}
		case actions.turn_mobile_slide_bar:
			return {
				screenType: "mobile",
				mobileProperties: {
					slidebar: true,
					content: false
				}
			}
		case actions.turn_mobile_chatbox: {
			return {
				screenType: "mobile",
				mobileProperties: {
					slidebar: false,
					content: true
				}
			}
		}
		case actions.clear: {
			return {
				...initialState
			}
		}
		default:
			throw new Error(`Not support ${action.type}`)
	}
}
//--------------------------------------------------------------------------------
// initial notificationcontext
const initialNotificaionContext = {
	isOpenNotificationBox: false,
	unreadNotifications: [],
	Notifications: []
}
// action
const NotificationActions = {
	setNotificationBoxStatus: "SET_NOTIFICATION_BOX_STATUS",
	addUnreadNotification: "ADD_UNREAD_NOTIFICATION",
	clearAllNewNotification: "READ_UNREAD_NOTIFICATION",
	initUnreadNotification: "UNREAD_NOTIFICATION_INIT",
	initNotification: "INIT_NOTIFICATION",
	addNotification: "ADD_NOTIFICATION",
	clear: "CLEAR"
}
// reducer Notification
const reducerNotification = (state, actions) => {
	switch (actions.type) {
		case NotificationActions.initNotification: {
			return {
				isOpenNotificationBox: state.isOpenNotificationBox,
				unreadNotifications: [...state.unreadNotifications],
				Notifications: [...actions.initNoti]
			}
		}
		case NotificationActions.addNotification: {
			return {
				isOpenNotificationBox: state.isOpenNotificationBox,
				unreadNotifications: [...state.unreadNotifications],
				Notifications: [actions.noti, ...state.Notifications]
			}
		}
		case NotificationActions.initUnreadNotification: {
			return {
				isOpenNotificationBox: state.isOpenNotificationBox,
				unreadNotifications: [...actions.unreadNoti],
				Notifications: [...state.Notifications]
			}
		}
		case NotificationActions.setNotificationBoxStatus: {
			return {
				isOpenNotificationBox: actions.status,
				unreadNotifications: [...state.unreadNotifications],
				Notifications: [...state.Notifications]
			}
		}
		case NotificationActions.addUnreadNotification: {
			return {
				isOpenNotificationBox: state.isOpenNotificationBox,
				unreadNotifications: [{ id: actions.notificationID }, ...state.unreadNotifications],
				Notifications: [...state.Notifications]
			}
		}
		case NotificationActions.clearAllNewNotification: {
			return {
				isOpenNotificationBox: state.isOpenNotificationBox,
				unreadNotifications: [],
				Notifications: [...state.Notifications]
			}
		}
		case NotificationActions.clear: {
			return {
				...initialNotificaionContext
			}
		}
		default:
			throw new Error(`Not support ${actions.type}`)
	}
}
//--------------------------------------------------------------------------------
// -----------------------chat context --------------------------------------
const initChatContext = {
	roomsMessage: [],
	roomsInfo: [],
}
const chatContextActions = {
	UpdateMessage: "UPDATE_ROOM_MESSAGE",
	InitRoomInfo: "INIT_ROOM_INFO",
	AddMessage: "ADD_MESSAGE",
	clear: "CLEAR"
}
// reducer
/*
	

*/
const reducerContext = (state, actions) => {
	switch (actions.type) {
		case chatContextActions.AddMessage:
			return {
				roomsMessage: [...actions.messages],
				roomsInfo: [...state.roomsInfo]
			}
		case chatContextActions.UpdateMessage:
			return {
				roomsMessage: [...state.roomsMessage],
				roomsInfo: [...actions.room]
			}
		case chatContextActions.clear:
			return {
				...initChatContext
			}
		default:
			throw new Error(`Not support ${actions.type}`)
	}
}


/**
 * Fuction for generate all component in url "/" include side bar in the left and chat box in the right
 * @returns ChatApp component
 */
function ChatApp() {
	// init state for deciding display app in mobile or in pc mode
	const [ResponsesiveState, dispathResponsiveMethod] = useReducer(reducer, initialState)
	// value for ResponsiveContext
	const valueResponsiveContext = {
		state: ResponsesiveState,
		setPCMode: () => { dispathResponsiveMethod({ type: actions.turn_pc_mode }) },
		setMobileModeOnSlideBar: () => {
			dispathResponsiveMethod({ type: actions.turn_mobile_slide_bar })
		},
		setMobileModeOnChatbox: () => {
			dispathResponsiveMethod({ type: actions.turn_mobile_chatbox })
		},
		clear: () => {
			dispathResponsiveMethod({type: actions.clear})
		}
	}
	// init state for notificationbox
	const [NotificationState, dispathNotificationContext] = useReducer(reducerNotification, initialNotificaionContext)
	// set method and value for child elements
	const valueNotificationContext = {
		state: NotificationState,
		initUnreadNotification: (unreadNotifications) => {
			dispathNotificationContext({ type: NotificationActions.initUnreadNotification, unreadNoti: unreadNotifications })
		},
		setNotificationBoxStatus: (status) => {
			dispathNotificationContext({ type: NotificationActions.setNotificationBoxStatus, status: status })
		},
		addUnreadNotification: (notificationID) => {
			dispathNotificationContext({ type: NotificationActions.addUnreadNotification, notificationID: notificationID })
		},
		initNotification: (notifications) => {
			dispathNotificationContext({ type: NotificationActions.initNotification, initNoti: notifications })
		},
		addNotification: (noti) => {
			dispathNotificationContext({ type: NotificationActions.addNotification, noti: noti })
		},
		clearUnreadNotification: () => {
			const unreadNoti = valueNotificationContext.state.unreadNotifications

			unreadNoti.forEach(element => {
				fetch(domain + "/notification/read/" + `${element.ntfID}`,
					{
						method: 'POST',
						credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json'
						}
					})
			});
			dispathNotificationContext({ type: NotificationActions.clearAllNewNotification })
		},
		clear: () => {
			dispathNotificationContext({type: NotificationActions.clear})
		}
	}
	const [ChatContextState, dispathChatContext] = useReducer(reducerContext, initChatContext)
	const valueChatContext = {
		state: ChatContextState,
		/**
		 * Add new Message to the context reducer
		 * @param {*} chatboxID 
		 * @param {*} messages 
		 * @returns 
		 */
		addMessage: (chatboxID, messages) => {
			let roomsmessage = valueChatContext.state.roomsMessage;
			if (!roomsmessage) roomsmessage = []
			// add message
			for (let i = 0; i < roomsmessage.length; i++) {
				if (roomsmessage[i].cbID === chatboxID) {
					roomsmessage[i].messages.push(messages)
					dispathChatContext({ type: chatContextActions.AddMessage, messages: roomsmessage })
					return
				}
			}
			// create new element for store message
			roomsmessage.push({
				cbID: chatboxID,
				messages: [messages]
			})
			dispathChatContext({ type: chatContextActions.AddMessage, messages: roomsmessage })
			return
		},
		/**
		 * Add a list of message to ChatContextState
		 * second parameter must be string
		 * @param {*} chatboxID 
		 * @param {*} messageList 
		 * @returns 
		 */
		addListMessage: (chatboxID, messageList) => {
			if (typeof (messageList) !== typeof ([])) throw new Error("Second parameter must be array")
			let roomsmessage = valueChatContext.state.roomsMessage;
			if (!roomsmessage) roomsmessage = []
			for (let i = 0; i < roomsmessage.length; i++) {
				if (roomsmessage[i].cbID === chatboxID) {
					roomsmessage[i].message = roomsmessage[i].message.concat(messageList)
					dispathChatContext({ type: chatContextActions.AddMessage, messages: roomsmessage })
					return
				}
			}
			roomsmessage.push({
				cbID: chatboxID,
				messages: [...messageList]
			})
			dispathChatContext({ type: chatContextActions.AddMessage, messages: roomsmessage })
			return
		},
		updateRoomInfo: (roominfo) => {
			if (!roominfo) return
			const makeDate = str => {

				const [_, yyyy, mm, dd, hh, min, ss] = str.match(/(\d{4})-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
				const date = new Date(yyyy, mm - 1, dd, hh, min, ss)
				return date
			};

			let roomsInfo = valueChatContext.state.roomsInfo;
			if (!roomsInfo) roomsInfo = []
			for (let i = 0; i < roomsInfo.length; i++) {
				if (roomsInfo[i].cbID === roominfo.cbID) {
					roomsInfo[i] = {
						cbID: roominfo.cbID,
						datemodifi: roominfo.datemodifi
					}
					if (roomsInfo.length >= 2) {
						roomsInfo.sort((a, b) => {
							// const d1 = makeDate(a.datemodifi)
							// const d2 = makeDate(b.datemodifi)
							return makeDate(b.datemodifi) - makeDate(a.datemodifi)
						})
					}
					dispathChatContext({ type: chatContextActions.UpdateMessage, room: roomsInfo })
					return
				}
			}
			roomsInfo.push({
				cbID: roominfo.cbID,
				datemodifi: roominfo.datemodifi
			})
			if (roomsInfo.length >= 2) {
				roomsInfo.sort((a, b) => {
					// const d1 = makeDate(a.datemodifi)
					// const d2 = makeDate(b.datemodifi)
					return makeDate(b.datemodifi) - makeDate(a.datemodifi)
				})
			}
			dispathChatContext({ type: chatContextActions.UpdateMessage, room: roomsInfo })
			return
		},
		clear: () => {
			dispathChatContext({ type: chatContextActions.clear})
		}
	}
	// dialog
	const [DialogStatus, setDialogStatus] = useState(false)
	const valueDialogContext = {
		value: DialogStatus,
		show: () => {
			setDialogStatus(true)
		},
		hide: () => {
			setDialogStatus(false)
		}
	}
	const [currenOpenRoomID, setCurrenOpenRoomID] = useState(null)
	const valueControlCurrenOpenRoom = {
		currenOpenRoomID: currenOpenRoomID,
		setCurrenOpenRoomID: (roomID) => {
			setCurrenOpenRoomID(roomID)
		}
	}
	// variable
	const history = useHistory()
	// update the type of the screen
	const checkType = () => {
		if ((document.documentElement.clientWidth >= 610)) {
			valueResponsiveContext.setPCMode()
		}
		else if ((document.documentElement.clientWidth < 610)) {
			valueResponsiveContext.setMobileModeOnSlideBar()
		};
	}
	// checking if connection was auth
	fetch(domain + "/isauth/",
		{
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(async response => {
			if (response.status === 200) {
				return
			}
			else {
				history.push("/login")
				return
			}
		})
		.catch(err => {
			history.push("/login")
		})
	useEffect(() => {
		const callAPI = async () => {
			checkType();
		window.addEventListener('resize', checkType)
		socketIO.connect()
		socketIO.listen('new-notification', async notification => {
			const userID = notification.userSend || notification.userIDSend
			const user = new User(userID)
			const userName = await user.getUserName()
			notification.userName = userName
			valueNotificationContext.addNotification(notification)
			if (NotificationState.isOpenNotificationBox) return
			valueNotificationContext.addUnreadNotification(notification)
		})
		socketIO.listen('new-update-room', async room => {
			const id = room.cbID
			await fetch(domain + "/room/get-room/" + `${id}`,
				{
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json'
					}
				})
				.then(async res => {
					if (res.status !== 200) return
					res = await res.json()
					valueChatContext.updateRoomInfo(res.room)
				})
				.catch(err => {
					console.log(err)
				})
		})
		// socketIO.listen('new-message', async message => {
		// 	console.log("1")
		// 	const room = await RoomController.getRoomByID(message.cbID)
		// 	await room.addMessage(message, true)
		// 	valueChatContext.addMessage(message.cbID, message)
		// 	await fetch(domain + "/room/get-room/" + `${message.cbID}`,
		// 		{
		// 			method: 'GET',
		// 			credentials: 'same-origin',
		// 			headers: {
		// 				'Content-Type': 'application/json'
		// 			}
		// 		})
		// 		.then(async res => {
		// 			if (res.status !== 200) return
		// 			res = await res.json()
		// 			valueChatContext.updateRoomInfo(res.room)
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// })
		// get unread notification
		await fetch(domain + "/notification/unread",
			{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(async response => {
				return await response.json()
			})
			.then(data => {
				const unreadNoti = data['unreadNoti']
				valueNotificationContext.initUnreadNotification(unreadNoti)
			})
			.catch(err => {
				console.log(err)
			})
		// get notification for init
		fetch(domain + "/notification",
			{
				method: 'GET',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			.then(async response => {
				return await response.json()
			})
			.then(data => {
				valueNotificationContext.initNotification(data)
			})
			.catch(err => {
				console.log(err)
			})
		// update room 
		fetch(domain + "/room/get-room/?limit=100", {
			method: 'GET',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(async res => {
				if (res.status !== 200) return
				res = await res.json()
				const rooms = res.rooms
				for (let i = 0; i < rooms.length; i++) {
					valueChatContext.updateRoomInfo(rooms[i])
				}
			})
			.catch(err => {
				console.log(err)
			})
		}
		callAPI()
	}, [])
	const [newMessage, setNewMessage] = useState(1)
	const valueContextNewMessage = { state: newMessage, setNewMessage: setNewMessage }
	return (
		<NewMessageContext.Provider value={valueContextNewMessage} >
			<ControleCurrenRoomContext.Provider value={valueControlCurrenOpenRoom}>
				<DialogContext.Provider value={valueDialogContext}>
					<ChatContext.Provider value={valueChatContext}>
						<ResponsesiveContext.Provider value={valueResponsiveContext}>
							<Dialog active={(() => valueDialogContext.value)()}>
								<AvatarEditor/>
							</Dialog>
							<div className={(() => {
								if (!valueDialogContext.value) return ""
								return "blur-chat-box"
							})()} id="chatapp" style={{ overflow: "hidden", display: "flex", width: "100vw", position: "relative" }} >
								<NotificationContext.Provider value={valueNotificationContext}>
									<SlideBar />
								</NotificationContext.Provider>
								<ChatContent />
							</div>
						</ResponsesiveContext.Provider>
					</ChatContext.Provider>
				</DialogContext.Provider>
			</ControleCurrenRoomContext.Provider>
		</NewMessageContext.Provider>
	)
}
export { ChatApp }