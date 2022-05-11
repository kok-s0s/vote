import Footer from '@components/footer'
import Github from '@components/github'
import PropTypes from 'prop-types'

interface BasicProps {
  children: React.ReactNode
  href: string
}

const Basic: React.FC<BasicProps> = (props) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between items-center relative">
      <Github />
      <>{props.children}</>
      <Footer href={props.href}/>
    </div>
  )
}

Basic.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
}

export default Basic
