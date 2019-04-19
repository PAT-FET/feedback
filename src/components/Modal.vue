<template>
  <div :class="[$style.root]" v-show="visible">
    <div :class="[$style.mask]" @click.self="close">
        <div :class="[$style.inner]">
            <div :class="[$style.content]">
                <div :class="[$style.header]">
                    <div :class="[$style.title]">{{title}}</div>
                    <div :class="[$style.close]" @click="close">&times;</div>
                </div>
                <div :class="[$style.body]">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Modal extends Vue {
  @Prop(Boolean) visible!: boolean

  @Prop(String) title!: string

  @Emit('update:visible') updateVisible (visible: boolean) {}

  close () {
    this.updateVisible(false)
  }

  mounted () {
    //   document.appendChild(this.$el)
  }

  beforeDestroy () {
    //   document.removeChild(this.$el)
  }
}
</script>
<style lang="scss" module>
@import "~@/styles/var.scss";
@import "~@/styles/mixins.scss";

.root {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.mask{
    background-color: rgba(0, 0, 0, 0.65);
    height: 100vh;
}

.inner {
    position: relative;
    width: 50%;
    margin: auto;
    top: 100px;
}

.content {
    background-color: #fff;
    border-radius: 4px;
    position: relative;
}

.header{
    padding: 20px;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
}

.close {
    color: #999;
    cursor: pointer;
    transition: all .2s;
    font-size: 18px;
    &:hover {
        opacity: 0.9;
        transform: scale(1.2);
    }
}

.body {
    padding: 20px;
}
</style>
