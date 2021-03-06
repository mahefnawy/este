// @flow
import * as React from 'react';
import { View } from 'react-native';
import Spacer from './core/Spacer';
import A from './core/A';
import { titles } from './app/sitemap';
import { FormattedMessage } from 'react-intl';
import withTheme, { type Theme } from './core/withTheme';
import { createFragmentContainer, graphql } from 'react-relay';
import * as generated from './__generated__/EditMainNav.graphql';

type EditMainNavProps = {|
  theme: Theme,
  data: generated.EditMainNav,
|};

class EditMainNav extends React.PureComponent<EditMainNavProps> {
  render() {
    const { theme, data } = this.props;
    return (
      <View style={theme.styles.appPageMainNav}>
        <Spacer>
          <A href={{ pathname: '/' }} prefetch>
            <FormattedMessage {...titles.index} />
          </A>
          <A href={{ pathname: '/web', query: { id: data.id } }} prefetch>
            {data.draftName}
          </A>
        </Spacer>
      </View>
    );
  }
}

export default createFragmentContainer(
  withTheme(EditMainNav),
  // https://github.com/relayjs/eslint-plugin-relay/issues/35
  // eslint-disable-next-line relay/unused-fields
  graphql`
    fragment EditMainNav on Web {
      id
      # This is like lazy initialization. Actually, it is.
      name @__clientField(handle: "draftName")
      draftName
    }
  `,
);
