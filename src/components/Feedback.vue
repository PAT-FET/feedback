<template>
  <div :class="[$style.root]">
    <div :class="[$style.header]">
      <div>
        <span :class="[$style.tag]">只看自己的</span>
      </div>
      <span :class="[$style.link]" @click="gotoList" v-if="currentIssue">返回问题清单</span>
      <button :class="[$style.primaryBtn]" v-else @click="createIssue">新问题</button>
    </div>
    <issue-detail :issue="currentIssue" v-if="currentIssue"></issue-detail>
    <issue-list @view="onView" :update-time="updateTime" v-else></issue-list>
    <edit-issue :visible.sync="visible" @update="onUpdate"></edit-issue>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import IssueList from './IssueList.vue'
import IssueDetail from './IssueDetail.vue'
import EditIssue from './EditIssue.vue'
import Issue from '../interface/Issue'

@Component({
  components: {
    IssueList,
    IssueDetail,
    EditIssue
  }
})
export default class Feedback extends Vue {
  currentIssue: Issue | null = null

  visible: boolean = false

  updateTime: number = Date.now()

  onView (issue: Issue) {
    this.currentIssue = issue
  }

  onUpdate () {
    this.updateTime = Date.now()
  }

  gotoList () {
    this.currentIssue = null
  }

  createIssue () {
    this.visible = true
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/var.scss";
@import "~@/styles/mixins.scss";

.root{
  font-size: $font-md;
  color: #24292e;
}

.header{
  height: 42px;
  padding-left: 20px;
  border-bottom: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  @include link();
}

.primaryBtn {
  @include primary-btn();
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 16px;
}

.tag {
  @include tag();
}
</style>
