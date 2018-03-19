import React from 'react'
import { bindActionCreators } from 'redux'
import {
  initStore,
  startClock,
  addCount,
  serverRenderClock
} from '../lib/store'
import withRedux from 'next-redux-wrapper'
import { StyleSheet, css } from 'aphrodite'
import App from '../components/App'
import Header from '../components/Header'
import Page from '../components/Page'
import Submit from '../components/Submit'
import PostList from '../components/PostList'
import withApollo from '../lib/withApollo'

class Index extends React.Component {
  static getInitialProps ({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer))
    store.dispatch(addCount())

    return { isServer }
  }

  componentDidMount () {
    this.timer = this.props.startClock()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <App>
        <div className={css(styles.root)}>
          <h1 className={css(styles.title)}>My page</h1>
          <Header />
          <Page title='Index' />
          <Submit />
          <PostList />
        </div>
      </App>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(
  withApollo(Index)
)

const styles = StyleSheet.create({
  root: {
    width: 80,
    height: 60,
    background: 'white',
    ':hover': {
      background: 'black'
    }
  },

  title: {
    marginLeft: 5,
    color: 'black',
    fontSize: 22,
    ':hover': {
      color: 'white'
    }
  }
})
