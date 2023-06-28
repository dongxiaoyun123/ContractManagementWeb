<script>
import { array } from 'yargs'

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Object
    },
    flag: {
      type: Boolean
    },
  },
  render(h, context) {
    const { icon, title, items, flag } = context.props
    const vnodes = []
    //flag 为true证明是子菜单就一个 否则子菜单十多个直接跳过就可以
    //items.children.length==1 
    //两个同事满足时才能添加图标
    if (icon && (flag ? (items && items.children && items.children.length == 1 ? true : false) : true)) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i style='color: inherit;' class={[icon, 'sub-el-icon']} />)
      } else {
        vnodes.push(<svg-icon style='color: inherit;' icon-class={icon} />)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
