<template>
  <div>
    <div>
      <div :class="[$style.header]">
        <div :class="[$style.title]">{{issue.title}}</div>
        <div :class="[$style.extra]"></div>
      </div>
      <div>{{issue.content}}</div>
      <div :class="[$style.footer]">
        <span :class="[$style.primaryText]">{{issue.userName}}</span>
        <span :class="[$style.mx1]">于</span>
        <span :class="[$style.secondaryText]">{{issue.submitTime}}</span>
        <span :class="[$style.mx1]">发布</span>
      </div>
    </div>

    <div>
      <div :class="[$style.inputWrapper]">
        <textarea v-model="content" rows="10" placeholder="说点什么" :class="[$style.textarea]"></textarea>
        <button :class="[$style.plainBtn]" @click="comment" :disabled="loading">回复</button>
      </div>
    </div>

    <comment-board :issue-id="issue && issue.id" :update-time="updateTime"></comment-board>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getIssues, createComment } from '@/api'
import Issue from '@/interface/Issue'
import CommentBoard from './CommentBoard.vue'
import Comment from '../interface/Comment'
@Component({
  components: { CommentBoard }
})
export default class IssueDetail extends Vue {
  @Prop() issue!: Issue

  content: string = ''

  updateTime: number = Date.now()

  loading: boolean = false

  comment () {
    if (!this.content || !this.content.trim()) return
    let req: Partial<Comment> = {
      issueId: this.issue && this.issue.id,
      content: this.content
    }
    this.loading = true
    createComment(req).then(() => {
      this.updateTime = Date.now()
      this.content = ''
    }).finally(() => {
      this.loading = false
    })
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/var.scss";
@import "~@/styles/mixins.scss";

.header {
  margin-bottom: 8px;
}

.footer {
  margin-top: 8px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: $primary-color;
  }
}

.primaryText {
  color: $primary-color;
}

.secondaryText {
  color: $secondary-color;
}

.mx1 {
  margin-left: 8px;
  margin-right: 8px;
}

.textarea {
  @include textarea();
}

.plainBtn {
  @include plain-btn();
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 16px;
}

.inputWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.commentWrapper {

}
</style>
