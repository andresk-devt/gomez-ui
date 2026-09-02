import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Dropdown from './Dropdown.vue'

const items = [
  { label: 'Editar', value: 'edit' },
  { label: 'Duplicar', value: 'dup' },
  { divider: true as const },
  { label: 'Borrar', value: 'del', danger: true },
  { label: 'Bloqueado', value: 'x', disabled: true },
]

describe('Dropdown', () => {
  it('renderiza un trigger por defecto y el menú cerrado', () => {
    const wrapper = mount(Dropdown, { props: { items } })
    expect(wrapper.get('.gmz-dropdown__trigger').text()).toContain('Opciones')
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('al pulsar el trigger abre el menú con un item por entrada y un separador', async () => {
    const wrapper = mount(Dropdown, { props: { items } })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    expect(wrapper.get('[role="menu"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="menuitem"]')).toHaveLength(4)
    expect(wrapper.findAll('[role="separator"]')).toHaveLength(1)
    expect(
      wrapper.get('.gmz-dropdown__trigger').attributes('aria-expanded'),
    ).toBe('true')
  })

  it('al elegir un item emite select con value + item y cierra', async () => {
    const wrapper = mount(Dropdown, { props: { items } })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    await wrapper.findAll('[role="menuitem"]')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toBe('edit')
    expect(wrapper.emitted('select')?.[0]?.[1]).toMatchObject({
      label: 'Editar',
    })
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('un item disabled no emite select', async () => {
    const wrapper = mount(Dropdown, { props: { items } })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    const disabled = wrapper
      .findAll('[role="menuitem"]')
      .find((b) => b.text() === 'Bloqueado')!
    await disabled.trigger('click')
    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('closeOnSelect=false mantiene el menú abierto tras elegir', async () => {
    const wrapper = mount(Dropdown, {
      props: { items, closeOnSelect: false },
    })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    await wrapper.findAll('[role="menuitem"]')[0].trigger('click')
    expect(wrapper.emitted('select')).toHaveLength(1)
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  })

  it('Escape en el menú lo cierra', async () => {
    const wrapper = mount(Dropdown, { props: { items } })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    await wrapper.get('[role="menu"]').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('ArrowDown mueve el item activo', async () => {
    const wrapper = mount(Dropdown, { props: { items } })
    await wrapper.get('.gmz-dropdown__trigger button').trigger('click')
    const menu = wrapper.get('[role="menu"]')
    expect(wrapper.get('[data-index="0"]').classes()).toContain('is-active')
    await menu.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.get('[data-index="1"]').classes()).toContain('is-active')
  })

  it('el slot trigger recibe { open, toggle } y aplica la clase de placement', async () => {
    const wrapper = mount(Dropdown, {
      props: { items, placement: 'top-end' },
      slots: {
        trigger: `<template #trigger="{ open, toggle }">
          <button class="t" @click="toggle">{{ open ? 'abierto' : 'cerrado' }}</button>
        </template>`,
      },
    })
    expect(wrapper.get('button.t').text()).toBe('cerrado')
    await wrapper.get('button.t').trigger('click')
    expect(wrapper.get('button.t').text()).toBe('abierto')
    expect(wrapper.get('[role="menu"]').classes()).toContain(
      'gmz-dropdown__menu--top-end',
    )
  })
})
