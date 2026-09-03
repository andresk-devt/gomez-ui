import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Drawer from './Drawer.vue'

const mountDrawer = (props = {}, slots = {}) =>
  mount(Drawer, { props, slots, global: { stubs: { teleport: true } } })

afterEach(() => {
  document.body.style.overflow = ''
  delete document.body.dataset.gmzScrollLocks
})

describe('Drawer', () => {
  it('no renderiza nada cerrado', () => {
    expect(
      mountDrawer({ modelValue: false }).find('[role="dialog"]').exists(),
    ).toBe(false)
  })

  it('abierto expone role=dialog + aria-modal y aplica la clase de lado', () => {
    const wrapper = mountDrawer({
      modelValue: true,
      side: 'left',
      title: 'Menú',
    })
    const panel = wrapper.get('[role="dialog"]')
    expect(panel.attributes('aria-modal')).toBe('true')
    expect(wrapper.get('.gmz-drawer').classes()).toContain('gmz-drawer--left')
    const id = panel.attributes('aria-labelledby')
    expect(wrapper.get(`#${id}`).text()).toBe('Menú')
  })

  it('bloquea el scroll del body mientras está abierto', async () => {
    const wrapper = mountDrawer({ modelValue: false })
    await wrapper.setProps({ modelValue: true })
    expect(document.body.style.overflow).toBe('hidden')
    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
  })

  it('cierra por botón, overlay y Escape (respetando los flags)', async () => {
    const a = mountDrawer({ modelValue: true, title: 'x' })
    await a.get('.gmz-drawer__close').trigger('click')
    expect(a.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const b = mountDrawer({ modelValue: true })
    await b.get('.gmz-drawer__overlay').trigger('click')
    expect(b.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const c = mountDrawer({ modelValue: true })
    await c.get('.gmz-drawer').trigger('keydown', { key: 'Escape' })
    expect(c.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const d = mountDrawer({ modelValue: true, closeOnOverlay: false })
    await d.get('.gmz-drawer__overlay').trigger('click')
    expect(d.emitted('update:modelValue')).toBeUndefined()
  })

  it('acepta size numérico o string como custom property', () => {
    expect(
      mountDrawer({ modelValue: true, size: 420 })
        .get('[role="dialog"]')
        .attributes('style'),
    ).toContain('--_size: 420px')
    expect(
      mountDrawer({ modelValue: true, size: '30rem' })
        .get('[role="dialog"]')
        .attributes('style'),
    ).toContain('--_size: 30rem')
  })

  it('el slot footer recibe close', async () => {
    const wrapper = mountDrawer(
      { modelValue: true },
      {
        footer: `<template #footer="{ close }"><button class="ok" @click="close">x</button></template>`,
      },
    )
    await wrapper.get('button.ok').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })
})
