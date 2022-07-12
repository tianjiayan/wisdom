import mySearch from '@/components/MySearch'
import myTable from '@/components/myTable'

export const install = (Vue) => {
  ;[mySearch, myTable].forEach((item) => Vue.component(item.name, item))
}
