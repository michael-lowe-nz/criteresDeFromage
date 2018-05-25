import { h } from 'preact'

const Indicator  = ({rating}) => (
  <p
    style={{
      fontSize: '60px',
      fontWeight: '600',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  > 
  {rating ?
    `${rating} %` :
    '0 %'
  }  
  </p>
)

export default Indicator