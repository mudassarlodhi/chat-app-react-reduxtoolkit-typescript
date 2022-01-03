 interface Message {
    messageId: string,
    text: string,
    from: string,
    fromUserName: string,
    to: string,
    toUserName: string,
    time: number
}

export default Message;