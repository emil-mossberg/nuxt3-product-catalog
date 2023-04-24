<template>
  <div class="uiCheckbox">
    <input
      class="uiCheckbox__checkbox"
      type="checkbox"
      :checked="props.checked"
      @click="emit('click')"
    />
    <label class="uiCheckbox__label">{{ props.label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
  label: string;
}>();

const emit = defineEmits<{
  (event: "click"): void;
}>();
</script>

<style lang="less">
.uiCheckbox {
  display: flex;
  align-items: center;
  gap: @indent__s;
  padding: @indent__s @indent__base;

  &__checkbox {
    border: 0;
    cursor: pointer;
    display: inline-block;
    height: 24px;
    margin: 0;
    position: relative;
    width: 24px;
    z-index: 1;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:after {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 24px;
      width: 24px;
      background-color: @uiCheckbox__backgroundColor;
      border: 2px solid @uiCheckbox__borderColor;
      content: "";
    }

    &:checked,
    &.selected {
      background: transparent !important; // iOS fix

      &:after {
        background: @uiCheckbox__color--active
          url("data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8'?%3E%3Csvg width='12px' height='10px' viewBox='0 0 12 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: sketchtool 52.6 (67491) - http://www.bohemiancoding.com/sketch --%3E%3Ctitle%3E9212CD26-6580-4C04-8733-4C6FCC83DA1B%3C/title%3E%3Cdesc%3ECreated with sketchtool.%3C/desc%3E%3Cg id='Style-Guide' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Style-Form-controls' transform='translate(-274.000000, -795.000000)' fill='%23FFFFFF'%3E%3Cg id='Stacked-Group' transform='translate(268.000000, 136.000000)'%3E%3Cg id='ui/radiobutton-item-selected' transform='translate(0.000000, 654.000000)'%3E%3Cg id='checkbox' transform='translate(0.000000, -2.000000)'%3E%3Cg id='Group-6'%3E%3Cg id='icon/check-white' transform='translate(6.000000, 6.000000)'%3E%3Cpolygon id='Fill-1' points='3.27286329 10.9435902 0 7.67072678 1.09070507 6.58002167 3.27286329 8.76217996 10.9092949 1.125 12 2.21643448'%3E%3C/polygon%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          no-repeat center;
        background-size: 80%;
        border-color: @uiCheckbox__color--active;
      }

      + label {
        color: @uiCheckbox__color--active;
      }
    }
  }
}
</style>
