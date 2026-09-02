import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Dialog from './Dialog.vue'

const mountDialog = (props = {}, slots = {}) =>
  mount(Dialog, {
    props,
    slots,
    global: { stubs: { teleport: true } },
  })

afterEach(() => {
  document.body.style.overflow = ''
  delete document.body.dataset.gmzDialogLocks
})

describe('Dialog', () => {
  it('no renderiza nada si modelValue es false', () => {
    const wrapper = mountDialog({ modelValue: false })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('abierto expone role=dialog, aria-modal y aria-labelledby al título', () => {
    const wrapper = mountDialog({ modelValue: true, title: 'Confirmar' })
    const panel = wrapper.get('[role="dialog"]')
    expect(panel.attributes('aria-modal')).toBe('true')
    const id = panel.attributes('aria-labelledby')
    expect(wrapper.get(`#${id}`).text()).toBe('Confirmar')
  })

  it('bloquea el scroll del body mientras está abierto', async () => {
    const wrapper = mountDialog({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
    await wrapper.setProps({ modelValue: true })
    expect(document.body.style.overflow).toBe('hidden')
    await wrapper.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
  })

  it('el botón de cerrar emite update:modelValue=false', async () => {
    const wrapper = mountDialog({ modelValue: true, title: 'X' })
    await wrapper.get('.gmz-dialog__close').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })

  it('clic en el overlay cierra salvo que closeOnOverlay sea false', async () => {
    const a = mountDialog({ modelValue: true })
    await a.get('.gmz-dialog__overlay').trigger('click')
    expect(a.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const b = mountDialog({ modelValue: true, closeOnOverlay: false })
    await b.get('.gmz-dialog__overlay').trigger('click')
    expect(b.emitted('update:modelValue')).toBeUndefined()
  })

  it('Escape cierra salvo que closeOnEsc sea false', async () => {
    const a = mountDialog({ modelValue: true })
    await a.get('.gmz-dialog').trigger('keydown', { key: 'Escape' })
    expect(a.emitted('update:modelValue')?.at(-1)).toEqual([false])

    const b = mountDialog({ modelValue: true, closeOnEsc: false })
    await b.get('.gmz-dialog').trigger('keydown', { key: 'Escape' })
    expect(b.emitted('update:modelValue')).toBeUndefined()
  })

  it('con closable=false no hay botón de cerrar ni cierre por overlay', async () => {
    const wrapper = mountDialog({ modelValue: true, closable: false })
    expect(wrapper.find('.gmz-dialog__close').exists()).toBe(false)
    await wrapper.get('.gmz-dialog__overlay').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('el slot footer recibe la función close', async () => {
    const wrapper = mountDialog(
      { modelValue: true },
      {
        footer: `<template #footer="{ close }">
          <button class="ok" @click="close">Cerrar</button>
        </template>`,
      },
    )
    await wrapper.get('button.ok').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
  })

  it('aplica la clase de size', () => {
    const wrapper = mountDialog({ modelValue: true, size: 'lg' })
    expect(wrapper.get('[role="dialog"]').classes()).toContain(
      'gmz-dialog__panel--lg',
    )
  })
})
