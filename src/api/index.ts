import Issue from '@/interface/Issue'
import Comment from '@/interface/Comment'
import { mockGetIssues, mockCreateIssue } from '../mock/issues'
import { mockGetComments, mockCreateComments } from '@/mock/comments'
import config from '@/config'
import getHttp from '../http/index'

export function getIssues (): Promise<Issue[]> {
  if (config.mockMode) return mockGetIssues()
  let req = {
    pageInfo: {
      pageNum: 1,
      pageSize: 100
    }
  }
  return getHttp().post<any>('feedback/list', req).then((data: any) => {
    let ret = (data || []).map((v: any) => {
      return {
        id: v.idFeedback,
        title: v.title,
        userId: v.createdBy,
        userName: v.createdBy,
        submitTime: v.dateCreated,
        content: v.content
      }
    })
    return ret as Issue[]
  })
}

export function createIssue (issue: Partial<Issue>): Promise<any> {
  if (config.mockMode) return mockCreateIssue(issue)
  return getHttp().post<any>('feedback/saveFeedback', issue)
}

export function getComments (issueId: string): Promise<Comment[]> {
  return getHttp().get<any>(`feedback/${issueId}/comments`).then((data: any) => {
    let ret = (data || []).map((v: any) => {
      return {
        id: v.idFeedbackDetail,
        issueId: v.idFeedback,
        userId: v.createdBy,
        userName: v.createdBy,
        commentTime: v.dateCreated,
        content: v.content
      }
    })
    return ret as Comment[]
  })
}

export function createComment (comment: Partial<Comment>): Promise<any> {
  if (config.mockMode) return mockCreateComments(comment)
  let req = {
    idFeedback: comment.issueId,
    content: comment.content,
    contentType: 'Q'
  }
  return getHttp().post<any>('feedback/saveFeedbackDetail', req)
}
