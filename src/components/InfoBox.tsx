import React, {useState} from 'react'

import '../styles/InfoBox.css'

interface InfoBoxProps {
  title: string
  children: React.ReactNode 
  initialOpen?: boolean

}

const InfoBox:React.FC<InfoBoxProps> = ({
  title,
  children,
  initialOpen = false
}) => {

  const [isOpen, setIsOpen] = useState(initialOpen)

  const toggleInfoBox = () => {
    setIsOpen(!isOpen)
  }

    return (

      <div className="info-box">
      <div className="info-box-header" onClick={toggleInfoBox}>
        <h2 className="info-box-title">{title}</h2>
        <button className="toggle-button">
          {isOpen ? '−' : '+'}
        </button>
      </div>
      
      {isOpen && (
        <div className="info-box-content">
          {children}
        </div>
      )}
    </div>
    )
}

export default InfoBox