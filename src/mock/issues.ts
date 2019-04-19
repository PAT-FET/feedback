import Issue from '@/interface/Issue'

const data = [
  {
    id: '1',
    title: 'issue 1',
    userId: '001',
    userName: '001',
    submitTime: '2019/04/12 12:12:13',
    content: 'It seems that order in which directives are applied to DOM elements and components are different. In my setup I have custom directive which relies on some DOM attribute with configuration data. When this custom directive is bound/unbound in a "regular flow" – everything works as expected (directive binds after element attributes are updated). However when directive is bound/unbound in case of Vue "in-place patch strategey", behavior seems to be different.'
  },
  {
    id: '2',
    title: 'issue 2',
    userId: '002',
    userName: '002',
    submitTime: '2019/04/12 12:12:13',
    content: 'Thanks for the answer. Yeah, that is what we used eventually as a workaround, I had to mention that in the ticket. However presence of key attribute will not allow to use Vue.js rendering optimisations. Would be great to have it fixed.'
  },
  {
    id: '3',
    title: 'issue 3',
    userId: '003',
    userName: '003',
    submitTime: '2019/04/12 12:12:13',
    content: 'Thanks for the answer. Yeah, that is what we used eventually as a workaround, I had to mention that in the ticket. However presence of key attribute will not allow to use Vue.js rendering optimisations. Would be great to have it fixed.'
  },
  {
    id: '4',
    title: 'issue 4',
    userId: '004',
    userName: '004',
    submitTime: '2019/04/12 12:12:13',
    content: 'Thanks for the answer. Yeah, that is what we used eventually as a workaround, I had to mention that in the ticket. However presence of key attribute will not allow to use Vue.js rendering optimisations. Would be great to have it fixed.'
  },
  {
    id: '5',
    title: 'issue 5',
    userId: '005',
    userName: '005',
    submitTime: '2019/04/12 12:12:13',
    content: 'Thanks for the answer. Yeah, that is what we used eventually as a workaround, I had to mention that in the ticket. However presence of key attribute will not allow to use Vue.js rendering optimisations. Would be great to have it fixed.'
  }
]

let id = 1000

export function mockGetIssues () {
  return Promise.resolve(data)
}

export function mockCreateIssue (issue: Partial<Issue>) {
  let extra = {
    id: id++ + '',
    userName: 'mock user',
    userid: 'mock user',
    submitTime: new Date().toString()
  }
  let ret = Object.assign(extra, issue)
  data.push(ret as any)
  return Promise.resolve()
}
