export default interface IChat {
  authorId: string
  date: string
  author: {
    name: string
  }
  text: string
  textForSender: string | undefined
}
