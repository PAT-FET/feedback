<template>
  <ul :class="[$style.container]">
    <li :class="[$style.item]" v-for="(issue, i) in issues" :key="i">
      <div :class="[$style.header]">
        <div :class="[$style.title]" @click="onView(issue)">{{issue.title}}</div>
        <div :class="[$style.extra]"></div>
      </div>
      <div>
        <span :class="[$style.primaryText]">{{issue.userName}}</span>
        <span :class="[$style.mx1]">于</span>
        <span :class="[$style.secondaryText]">{{issue.submitTime}}</span>
        <span :class="[$style.mx1]">发布</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import { getIssues } from '@/api'
import Issue from '@/interface/Issue'
@Component
export default class IssueList extends Vue {
  @Prop(Number) updateTime!: number

  issues: Issue[] = []

  @Emit() view (issue: Issue) {}

  onView (issue: Issue) {
    this.view(issue)
  }

  loadData () {
    getIssues().then(data => {
      this.issues = data || []
    }).catch((e: any) => {
      this.issues = []
    }).finally(() => {
    })
  }

  mounted () {
    this.loadData()
  }

  @Watch('updateTime') updateTimeChange () {
    this.loadData()
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/var.scss";

.container{
  list-style: none;
  padding: 0;
  margin: 0;
}

.title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
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

.item {
  padding: 12px 20px;
  border-bottom: 1px solid #e2e2e2;
}
</style>
