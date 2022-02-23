import { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");

  function handleItemClick (e, { name }){
    setActiveItem(name)
  }

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick}/>
          <Menu.Item name='messages' active={activeItem === 'messages'} onClick={handleItemClick}/>
          <Menu.Item name='friends' active={activeItem === 'friends'}onClick={handleItemClick}
          />
        </Menu>
      </Segment>
    )
}

export default NavBar;