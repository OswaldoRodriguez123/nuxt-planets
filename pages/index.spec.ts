import { describe, expect, test } from 'vitest'
import indexVue from './index.vue'
import { mount } from '@vue/test-utils';

describe('index', async () => {
  test('it should render', async() => {
    const wrapper = mount(indexVue);
    expect(wrapper).toBeDefined();
  })
})
