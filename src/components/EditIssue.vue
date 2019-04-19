<template>
  <div :class="[$style.root]">
    <modal :visible.sync="actualVisible" title="新问题">
      <form ref="form">
        <div :class="[$style.formControl]">
          <label :class="[$style.label]">编辑标题</label>
          <input v-model.trim="form.title" type="text" :class="[$style.input]" required maxlength="100" title="请填写标题">
        </div>
        <div :class="[$style.formControl]">
          <label :class="[$style.label]">编辑内容</label>
          <textarea v-model.trim="form.content" type="text" :class="[$style.textarea]" required maxlength="2000" title="请填写内容"></textarea>
        </div>
      </form>

      <div style="text-align: right;">
        <button :class="[$style.plainBtn]" @click="actualVisible = false">取消</button>
        <button :class="[$style.primaryBtn]" @click="onSubmit" :disabled="loading">提交</button>
      </div>
    </modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import Modal from './Modal.vue'
import { createIssue } from '../api'
@Component({
  components: { Modal }
})
export default class EditIssue extends Vue {
  @Prop(Boolean) visible!: boolean

  @Emit('update:visible') updateVisible (visible: boolean) {}

  @Emit() update () {}

  form = {
    title: '',
    content: ''
  }

  loading: boolean = false

  get actualVisible () {
    return this.visible
  }

  set actualVisible (visible: boolean) {
    this.updateVisible(visible)
  }

  onSubmit () {
    if (this.validate()) {
      this.loading = true
      createIssue(this.form).then(() => {
        this.update()
        this.actualVisible = false
      }).finally(() => {
        this.loading = false
      })
    }
  }

  validate () {
    if (!this.form.title || !this.form.content) return false
    return true
  }

  @Watch('actualVisible') actualVisibleChange (visible: boolean) {
    if (visible) {
      this.form = {
        title: '',
        content: ''
      }
    }
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/var.scss";
@import "~@/styles/mixins.scss";

.input {
  @include input();
}

.textarea {
  @include textarea();
  height: 186px;
}

.label {
  white-space: nowrap;
  color: #666;
  margin-right: 16px;
}

.formControl {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
}

.plainBtn {
  @include plain-btn();
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 8px;
}

.primaryBtn {
  @include primary-btn();
  padding-left: 16px;
  padding-right: 16px;
  margin: 0 8px;
}

</style>
