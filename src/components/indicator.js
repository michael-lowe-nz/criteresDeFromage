import { h } from 'preact'

const Indicator  = ({rating}) => {

  let customColor

  if (0 <= rating && rating <= 30) {
    customColor = 'red'
  } else if (31 <= rating && rating <= 60) {
    customColor = 'black'
  } else {
    customColor = 'green'
  }

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
    textAlign: 'center',
    color: customColor
  }

  console.log('spanStyles.color:', spanStyles.color);

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