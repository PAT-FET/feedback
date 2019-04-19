<template>
  <div>
    <div :class="[$style.header]">
      <span :class="[$style.title]">全部回答</span>
      <span> {{comments.length}} </span>
    </div>

    <div>
      <ul :class="[$style.listContainer]">
        <li :class="[$style.item]" v-for="(c, i) in comments" :key="i">
          <div :class="[$style.itemHeader]">
            <div :class="[$style.itemTitle]">{{c.userName}}</div>
            <div :class="[$style.itemTime]">{{c.commentTime}}</div>
          </div>
          <div :class="[$style.itemBody]">
            {{c.content}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import Comment from '../interface/Comment'
import { getComments } from '@/api'

@Component({
  components: {}
})
export default class CommentBoard extends Vue {
  @Prop(String) issueId!: string

  @Prop(Number) updateTime!: number

  comments: Comment[] = []

  loadData () {
    if (!this.issueId) {
      this.comments = []
      return
    }
    getComments(this.issueId).then(data => {
      this.comments = data || []
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

.header {
  margin: 12px 0;
  border-top: solid 1px $border-color;
  border-bottom: solid 1px $border-color;
  line-height: 48px;
}

.title {
  font-weight: 500;
}

.listContainer {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  padding: 12px 20px;
  border-bottom: 1px solid #e2e2e2;
}

.itemHeader {
  display: flex;
  margin-bottom: 12px;
}

.itemTitle {
  font-weight: 500;
  font-size: $font-lg;
}

.itemTime {
  margin-left: 32px;
  color: $secondary-color;
}

</style>
