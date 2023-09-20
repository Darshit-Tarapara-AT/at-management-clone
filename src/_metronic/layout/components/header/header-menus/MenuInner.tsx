import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'
import {Strings} from 'app/resource/Strings'

export function MenuInner() {

  return (
    <>
      {/* <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuItem title='Layout Builder' to='/builder' /> */}
      {/* <MenuInnerWithSub
        title={Strings.crafted}
        to='/crafted'
        menuPlacement='bottom-start'
        menuTrigger='hover'
      > */}
        {/* PAGES */}
        {/* <MenuInnerWithSub
          title={Strings.pages}
          to='/crafted/pages'
          fontIcon='bi-archive'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={'hover'}
        >
          <MenuInnerWithSub
            title={Strings.profile}
            to='/crafted/pages/profile'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to='/crafted/pages/profile/overview'
              title={Strings.overview}
              hasBullet={true}
            />
            <MenuItem
              to='/crafted/pages/profile/projects'
              title={Strings.projects}
              hasBullet={true}
            />
            <MenuItem
              to='/crafted/pages/profile/campaigns'
              title={Strings.campaigns}
              hasBullet={true}
            />
            <MenuItem
              to='/crafted/pages/profile/documents'
              title={Strings.documents}
              hasBullet={true}
            />
            <MenuItem
              to='/crafted/pages/profile/connections'
              title={Strings.connections}
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title={Strings.wizards}
            to='/crafted/pages/wizards'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem
              to='/crafted/pages/wizards/horizontal'
              title={Strings.horizontal}
              hasBullet={true}
            />
            <MenuItem
              to='/crafted/pages/wizards/vertical'
              title={Strings.vertical}
              hasBullet={true}
            />
          </MenuInnerWithSub>
        </MenuInnerWithSub> */}

        {/* ACCOUNT */}
        {/* <MenuInnerWithSub
          title={Strings.accounts}
          to='/crafted/accounts'
          fontIcon='bi-person'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={'hover'}
        >
          <MenuItem to='/crafted/account/overview' title={Strings.overview} hasBullet={true} />
          <MenuItem to='/crafted/account/settings' title={Strings.settings} hasBullet={true} />
        </MenuInnerWithSub> */}

        {/* ERRORS */}
        {/* <MenuInnerWithSub
          title={Strings.errors}
          to='/error'
          fontIcon='bi-sticky'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={'hover'}
        >
          <MenuItem to='/error/404' title='Error 404' hasBullet={true} />
          <MenuItem to='/error/500' title='Error 500' hasBullet={true} />
        </MenuInnerWithSub> */}

        {/* Widgets */}
        {/* <MenuInnerWithSub
          title={Strings.widgets}
          to='/crafted/widgets'
          fontIcon='bi-layers'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={'hover'}
        >
          <MenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
          <MenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
          <MenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
          <MenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
          <MenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
          <MenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
        </MenuInnerWithSub> */}
      {/* </MenuInnerWithSub> */}

      {/* <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='hover'> */}
        {/* PAGES */}
        {/* <MenuInnerWithSub
          title={Strings.chat}
          to='/apps/chat'
          icon='/media/icons/duotune/communication/com012.svg'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={'hover'}
        >
          <MenuItem to='/apps/chat/private-chat' title={Strings.privateChat} hasBullet={true} />
          <MenuItem to='/apps/chat/group-chat' title={Strings.groupChart} hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title={Strings.drawerChart} hasBullet={true} />
        </MenuInnerWithSub>
        <MenuItem
          icon='/media/icons/duotune/general/gen051.svg'
          to='/apps/user-management/users'
          title={Strings.userManagement}
        />
      </MenuInnerWithSub> */}

      {/* <MenuInnerWithSub
        isMega={true}
        title={Strings.megaMenu}
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger={'hover'}
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
