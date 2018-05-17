import { h } from 'preact'

const Indicator  = ({rating}) => (
  <p
    style={{
      fontSize: '60px',
      fontWeight: '600',
      padding: '2em'
    }}
  > 
  {rating ?
    `${rating} %` :
    '0 %'
  }  
  </p>
)

export default Indicator