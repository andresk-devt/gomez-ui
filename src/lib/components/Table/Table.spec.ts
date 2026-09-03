import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from './Table.vue'

const columns = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'age', label: 'Edad', sortable: true, align: 'right' as const },
  { key: 'city', label: 'Ciudad' },
]

const rows = [
  { id: 1, name: 'Ana', age: 30, city: 'Madrid' },
  { id: 2, name: 'Carlos', age: 25, city: 'Lima' },
  { id: 3, name: 'Beatriz', age: 41, city: 'Bogotá' },
]

describe('Table', () => {
  it('renderiza encabezados con scope=col y una fila por dato', () => {
    const wrapper = mount(Table, { props: { columns, rows } })
    expect(wrapper.findAll('thead th')).toHaveLength(3)
    expect(wrapper.get('thead th').attributes('scope')).toBe('col')
    expect(wrapper.findAll('tbody tr')).toHaveLength(3)
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Ana')
  })

  it('las columnas sortable exponen aria-sort y emiten update:sort en ciclo asc→desc→null', async () => {
    const wrapper = mount(Table, { props: { columns, rows } })
    const th = wrapper.findAll('thead th')[0]
    expect(th.attributes('aria-sort')).toBe('none')

    await th.get('button.gmz-table__sort').trigger('click')
    expect(wrapper.emitted('update:sort')?.[0]).toEqual([
      { key: 'name', order: 'asc' },
    ])

    await wrapper.setProps({ sort: { key: 'name', order: 'asc' } })
    expect(wrapper.findAll('thead th')[0].attributes('aria-sort')).toBe(
      'ascending',
    )
    await wrapper
      .findAll('thead th')[0]
      .get('button.gmz-table__sort')
      .trigger('click')
    expect(wrapper.emitted('update:sort')?.at(-1)).toEqual([
      { key: 'name', order: 'desc' },
    ])

    await wrapper.setProps({ sort: { key: 'name', order: 'desc' } })
    await wrapper
      .findAll('thead th')[0]
      .get('button.gmz-table__sort')
      .trigger('click')
    expect(wrapper.emitted('update:sort')?.at(-1)).toEqual([null])
  })

  it('ordena internamente por la columna indicada (números y texto)', () => {
    const asc = mount(Table, {
      props: { columns, rows, sort: { key: 'age', order: 'asc' } },
    })
    expect(asc.findAll('tbody tr').map((r) => r.text())).toEqual([
      expect.stringContaining('Carlos'),
      expect.stringContaining('Ana'),
      expect.stringContaining('Beatriz'),
    ])
    const desc = mount(Table, {
      props: { columns, rows, sort: { key: 'name', order: 'desc' } },
    })
    expect(desc.findAll('tbody tr')[0].text()).toContain('Carlos')
  })

  it('manualSort deja las filas tal cual', () => {
    const wrapper = mount(Table, {
      props: {
        columns,
        rows,
        manualSort: true,
        sort: { key: 'age', order: 'asc' },
      },
    })
    expect(wrapper.findAll('tbody tr')[0].text()).toContain('Ana')
  })

  it('loading pinta filas skeleton; sin filas muestra el texto vacío', () => {
    const loading = mount(Table, {
      props: { columns, rows: [], loading: true, loadingRows: 2 },
    })
    expect(loading.findAll('tbody tr')).toHaveLength(2)
    expect(loading.findAll('.gmz-skeleton').length).toBeGreaterThan(0)

    const empty = mount(Table, {
      props: { columns, rows: [], emptyText: 'Nada por aquí' },
    })
    const cell = empty.get('.gmz-table__empty')
    expect(cell.text()).toBe('Nada por aquí')
    expect(cell.attributes('colspan')).toBe('3')
  })

  it('slot cell-<key> personaliza la celda y row-click emite la fila', async () => {
    const wrapper = mount(Table, {
      props: { columns, rows },
      slots: {
        'cell-name':
          '<template #cell-name="{ value }"><b>{{ value }}!</b></template>',
      },
    })
    expect(wrapper.get('tbody b').text()).toBe('Ana!')
    await wrapper.findAll('tbody tr')[1].trigger('click')
    expect(wrapper.emitted('row-click')?.[0]?.[0]).toMatchObject({
      name: 'Carlos',
    })
  })

  it('aplica clases de size, striped y hoverable', () => {
    const wrapper = mount(Table, {
      props: { columns, rows, size: 'sm', striped: true, hoverable: true },
    })
    const table = wrapper.get('table')
    expect(table.classes()).toEqual(
      expect.arrayContaining([
        'gmz-table--sm',
        'gmz-table--striped',
        'gmz-table--hoverable',
      ]),
    )
  })
})
