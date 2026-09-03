import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from './Sidebar.vue'

const items = [
  { label: 'Panel', value: 'dashboard' },
  { label: 'Enlace', href: '/externo' },
  {
    label: 'Ajustes',
    value: 'settings',
    children: [
      { label: 'Perfil', value: 'profile' },
      { label: 'Equipo', value: 'team', badge: 3 },
    ],
  },
  { label: 'Deshabilitado', value: 'x', disabled: true },
]

describe('Sidebar', () => {
  it('usa <nav aria-label> y renderiza items simples, enlaces y grupos', () => {
    const wrapper = mount(Sidebar, { props: { items, ariaLabel: 'Menú' } })
    expect(wrapper.get('nav').attributes('aria-label')).toBe('Menú')
    expect(wrapper.get('a.gmz-sidebar__link').attributes('href')).toBe(
      '/externo',
    )
    expect(wrapper.get('.gmz-sidebar__group').attributes('aria-expanded')).toBe(
      'false',
    )
  })

  it('marca el item activo con aria-current y clase', () => {
    const wrapper = mount(Sidebar, {
      props: { items, modelValue: 'dashboard' },
    })
    const active = wrapper.get('.gmz-sidebar__link.is-active')
    expect(active.text()).toContain('Panel')
    expect(active.attributes('aria-current')).toBe('page')
  })

  it('al pulsar un item con value emite update:modelValue y select', async () => {
    const wrapper = mount(Sidebar, { props: { items } })
    await wrapper.findAll('.gmz-sidebar__link')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['dashboard'])
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({
      value: 'dashboard',
    })
  })

  it('el grupo se pliega/despliega y oculta el sublist con [hidden]', async () => {
    const wrapper = mount(Sidebar, { props: { items } })
    const group = wrapper.get('.gmz-sidebar__group')
    expect(
      wrapper.get('.gmz-sidebar__sublist').attributes('hidden'),
    ).toBeDefined()
    await group.trigger('click')
    expect(group.attributes('aria-expanded')).toBe('true')
    expect(
      wrapper.get('.gmz-sidebar__sublist').attributes('hidden'),
    ).toBeUndefined()
  })

  it('arranca con el grupo abierto si un hijo está activo', () => {
    const wrapper = mount(Sidebar, { props: { items, modelValue: 'team' } })
    expect(wrapper.get('.gmz-sidebar__group').attributes('aria-expanded')).toBe(
      'true',
    )
    expect(wrapper.get('.gmz-sidebar__badge').text()).toBe('3')
  })

  it('collapsed añade la clase raíl y colapsa los grupos a item simple', () => {
    const wrapper = mount(Sidebar, { props: { items, collapsed: true } })
    expect(wrapper.classes()).toContain('gmz-sidebar--collapsed')
    expect(wrapper.find('.gmz-sidebar__group').exists()).toBe(false)
  })

  it('renderiza el slot icon y el footer con { collapsed }', () => {
    const wrapper = mount(Sidebar, {
      props: { items, collapsed: true },
      slots: {
        icon: '<i class="ico" />',
        footer:
          '<template #footer="{ collapsed }">{{ collapsed ? "raíl" : "full" }}</template>',
      },
    })
    expect(wrapper.find('.gmz-sidebar__icon .ico').exists()).toBe(true)
    expect(wrapper.get('.gmz-sidebar__footer').text()).toBe('raíl')
  })
})
