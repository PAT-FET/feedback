import Comment from '../interface/Comment'

const data = [
  {
    id: '1',
    issueId: '1',
    userName: '001',
    userId: '001',
    commentTime: '2019/04/14 09:13:45',
    content: 'What @posva said is already covered in the documentation.'
  },
  {
    id: '1',
    issueId: '1',
    userName: '002',
    userId: '002',
    commentTime: '2019/04/14 09:13:45',
    content: 'The optimization is based on that you have stateless elements so Vue won’t bother to take care of correctly managing event handlers or local states when trying to reuse an element. So I think this is not a bug but can be potentially improved in our docs so that our users can understand this more easily.'
  },
  {
    id: '1',
    issueId: '1',
    userName: '003',
    userId: '003',
    commentTime: '2019/04/14 09:13:45',
    content: 'Directive will emit the same console messages when applied to DOM elements and to components (on init and after click on button'
  }
]

export function mockGetComments (issueId: string) {
  return Promise.resolve(data.filter(v => v.issueId === issueId || !issueId))
}

let id = 1000

export function mockCreateComments (comment: Partial<Comment>) {
  let extra = {
    id: id++ + '',
    userName: 'mock user',
    userid: 'mock user',
    commentTime: new Date().toString()
  }
  let ret = Object.assign(extra, comment)
  data.push(ret as any)
  return Promise.resolve()
}
