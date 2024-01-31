import { Ref, ref } from 'vue'
import type { SomeType } from '@/types/ExampleType'

export const obj1: Ref<SomeType> = ref({ someString: 'someString' })
