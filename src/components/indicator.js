import { h } from 'preact'

const Indicator  = ({rating}) => {

  const containerStyles = {
    fontSize: '60px',
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'flexWrap',
    marginTop: '25px'
  }

  const spanStyles = {
    borderRadius: '50%',
    backgroundColor: 'white',
    width: '150px',
    height: '150px',
    lineHeight: '150px',
    textAlign: 'center'
  }

  const percentageStyles = {
    ...spanStyles,
    fontSize: '20px',
    marginLeft: '5px'
  }

  return (
  <p style={containerStyles}> 
    <span style={spanStyles}>
      {rating ? `${rating}` : '0'}  
      <span style={percentageStyles}>%</span>
    </span>
  </p>
  )
}

export default Indicator