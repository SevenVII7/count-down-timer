<template>
  <div id="page">
    <div class="controller">
      <input
        type="checkbox"
        id="is_repeat"
        value="repeat"
        v-model="isRepeat"
        :disabled="isStart"
      >
      <label
        for="is_repeat"
        class="txt-white"
        :style="[isStart ? 'opacity: .3': '']"
      >
        <span></span>
        <p>
          Repeat
        </p>
      </label>
      <input
        type="text"
        placeholder="seconds"
        v-model.number="secondsSetting"
        :disabled="isStart"
        :style="[isStart ? 'opacity: .3': '']"
      >
      <button v-if="!isStart" @click="startCountdown">Start</button>
      <button v-else @click="stopCountdown">Stop</button>
    </div>
    <div class="show">
      <p :class="[remainingTime <= 1 && isStart ? 'red' : '']" :style="[remainingTime <= 1 && isStart? 'transition-duration: .5s; transition-delay: .5s;':'']">
        {{timerShow}}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const secondsSetting = ref(3)
const remainingTime = ref(0)
const timerShow = ref(timerString(secondsSetting.value))
const isStart = ref(false)
const isRepeat = ref([])
const interval = ref()

function timerString(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function printTimer(seconds: number) {
  const showStr = timerString(seconds)
  console.log(showStr)
  timerShow.value = showStr
}

function startCountdown() {
  remainingTime.value = secondsSetting.value;
  isStart.value = true
  printTimer(remainingTime.value)
  interval.value = setInterval(() => {
    remainingTime.value -= 1;
    if (remainingTime.value < 0) {
      stopCountdown()
      remainingTime.value = secondsSetting.value;
      if(isRepeat.value.length > 0){
        startCountdown()
      }
    } else {
      printTimer(remainingTime.value)
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(interval.value);
  isStart.value = false
  printTimer(secondsSetting.value)
}

</script>
