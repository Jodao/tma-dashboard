import { useState } from 'react'
import { Menu, Segment, Icon, Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

function NavBar() {
  const [activeItem, setActiveItem] = useState("home");

  function handleItemClick (e, { name }){
    setActiveItem(name)
  }

    return (
      <Grid centered>
        <Segment inverted compact>
          <Menu icon='labeled'  compact inverted pointing secondary>
            <Link to="/" >
              <Menu.Item name='home' active={activeItem === 'home'} onClick={handleItemClick}>
                <Icon name='gamepad' />
                Home
              </Menu.Item>
            </Link>
            <Link to="/getMetrics">
              <Menu.Item name='metrics' active={activeItem === 'metrics'} onClick={handleItemClick}>
                <Icon name='gamepad' />
                Metrics
              </Menu.Item>
            </Link>
            <Link to="/getQualityModels">
              <Menu.Item name='qms' active={activeItem === 'qms'}onClick={handleItemClick}>
                <Icon name='gamepad' />
                Quality Models
              </Menu.Item>
            </Link>
          </Menu>
        </Segment>
      </Grid>
    )
}

export default NavBar;