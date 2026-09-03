import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './Pagination.vue'

const pageButtons = (w: ReturnType<typeof mount>) =>
  w
    .findAll('.gmz-pagination__btn')
    .filter((b) => !b.classes().includes('gmz-pagination__btn--nav'))

describe('Pagination', () => {
  it('deriva el número de páginas de total/pageSize', () => {
    const wrapper = mount(Pagination, {
      props: { total: 95, pageSize: 10, page: 1 },
    })
    const labels = pageButtons(wrapper).map((b) => b.text())
    expect(labels).toContain('10')
    expect(labels).not.toContain('11')
  })

  it('acepta pageCount directo y marca la página actual con aria-current', () => {
    const wrapper = mount(Pagination, { props: { pageCount: 5, page: 3 } })
    const active = wrapper.get('.gmz-pagination__btn.is-active')
    expect(active.text()).toBe('3')
    expect(active.attributes('aria-current')).toBe('page')
  })

  it('emite update:page al pulsar una página o las flechas', async () => {
    const wrapper = mount(Pagination, { props: { pageCount: 10, page: 5 } })
    await pageButtons(wrapper)
      .find((b) => b.text() === '6')!
      .trigger('click')
    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([6])

    await wrapper.get('[aria-label="Página anterior"]').trigger('click')
    expect(wrapper.emitted('update:page')?.at(-1)).toEqual([4])
  })

  it('deshabilita anterior en la primera y siguiente en la última', () => {
    const first = mount(Pagination, { props: { pageCount: 4, page: 1 } })
    expect(
      first.get('[aria-label="Página anterior"]').attributes('disabled'),
    ).toBeDefined()
    const last = mount(Pagination, { props: { pageCount: 4, page: 4 } })
    expect(
      last.get('[aria-label="Página siguiente"]').attributes('disabled'),
    ).toBeDefined()
  })

  it('inserta elipsis con muchas páginas y siempre muestra primera y última', () => {
    const wrapper = mount(Pagination, {
      props: { pageCount: 20, page: 10, siblingCount: 1 },
    })
    expect(wrapper.findAll('.gmz-pagination__ellipsis')).toHaveLength(2)
    const labels = pageButtons(wrapper).map((b) => b.text())
    expect(labels[0]).toBe('1')
    expect(labels.at(-1)).toBe('20')
    expect(labels).toEqual(['1', '9', '10', '11', '20'])
  })

  it('recorta page fuera de rango y no emite si no cambia', async () => {
    const wrapper = mount(Pagination, { props: { pageCount: 5, page: 99 } })
    expect(wrapper.get('.gmz-pagination__btn.is-active').text()).toBe('5')
    await wrapper.get('[aria-label="Página siguiente"]').trigger('click')
    expect(wrapper.emitted('update:page')).toBeUndefined()
  })

  it('disabled bloquea toda interacción', async () => {
    const wrapper = mount(Pagination, {
      props: { pageCount: 5, page: 2, disabled: true },
    })
    await pageButtons(wrapper)
      .find((b) => b.text() === '3')!
      .trigger('click')
    expect(wrapper.emitted('update:page')).toBeUndefined()
  })
})
