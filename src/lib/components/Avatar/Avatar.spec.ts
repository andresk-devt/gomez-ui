import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar', () => {
  it('renderiza la imagen con alt derivado del name', () => {
    const wrapper = mount(Avatar, {
      props: { src: 'https://x/y.png', name: 'Ada Lovelace' },
    })
    const img = wrapper.get('img')
    expect(img.attributes('src')).toBe('https://x/y.png')
    expect(img.attributes('alt')).toBe('Ada Lovelace')
  })

  it('si la imagen falla muestra las iniciales del name', async () => {
    const wrapper = mount(Avatar, {
      props: { src: 'https://x/broken.png', name: 'Ada Lovelace' },
    })
    await wrapper.get('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.get('.gmz-avatar__initials').text()).toBe('AL')
  })

  it('sin src ni name cae en el icono por defecto', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.get('.gmz-avatar__icon').exists()).toBe(true)
  })

  it('aplica clases de size, shape y variant', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'lg', shape: 'rounded', variant: 'accent' },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'gmz-avatar--lg',
        'gmz-avatar--rounded',
        'gmz-avatar--accent',
      ]),
    )
  })

  it('acepta un size numérico como custom property', () => {
    const wrapper = mount(Avatar, { props: { size: 64 } })
    expect(wrapper.attributes('style')).toContain('--_size: 64px')
  })

  it('el slot por defecto sustituye al contenido de respaldo', () => {
    const wrapper = mount(Avatar, {
      slots: { default: '<span data-test="c">JD</span>' },
    })
    expect(wrapper.find('[data-test="c"]').exists()).toBe(true)
  })
})
