import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtIcon } from 'taro-ui'

import './index.scss'

// component
import TopSearch from '../../component/discovery/top_search'  //顶部搜索
import List from '../../component/discovery/list'             //列表

class Index extends Component {
    config = {
        navigationBarTitleText: '发现'
    }

    constructor() {
        super(...arguments)
        this.state = {
            showStartPage: true,
            searchValue: '',
            loading: false,
            currentTab: 0,
            selfhoodBanners: [], //轮播1
            recommendMusicList: [], //推荐歌单,
            newsong: [], // 最新音乐
            djprogram: [], //主播电台
        }
    }
    // methods
    handleSwitchTabs(value) {
        this.setState({
            currentTab: value
        })
    }

    componentWillReceiveProps(nextProps) {
        // console.log('update?')
        console.log(this.props, nextProps)
        // document.getElementsByClassName('at-tabs__body')[0].classList.add('t300')
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidMount() {
        console.log(this.$router)
        // document.getElementsByClassName('at-tabs__body')[0].classList.add('t300')
        if (this.$router.fullUrl == '/pages/index/index') {
            console.log('我来了')
        }
        //send request
        setTimeout(() => {
            this.setState({
                showStartPage: false
            })
        }, 1000)

        Taro.showLoading({ title: 'loading' })
        // banner
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/banner'
        }).then(res => {
            Taro.hideLoading()
            // console.log(res)
            if (res.statusCode == 200) {
                this.setState({
                    selfhoodBanners: res.data.banners,
                    loading: false
                })
            }
        })
        // 推荐音乐
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/personalized?limit=6'
        }).then(res => {
            console.log('推荐音乐')
            console.log(res)
            if (res.statusCode == 200) {
                this.setState({
                    recommendMusicList: res.data.result,
                })
            }
        })
        //  最新音乐
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/mv/first?limit=6'
        }).then(res => {
            console.log('最新音乐')
            console.log(res)
            if (res.statusCode == 200) {
                this.setState({
                    newsong: res.data.data,
                })
            }
        })
        // 主播电台
        Taro.request({
            url: 'https://music.kaier33.top/netcloud/personalized/djprogram?limit=6'
        }).then(res => {
            console.log('最新音乐')
            console.log(res)
            if (res.statusCode == 200) {
                this.setState({
                    djprogram: res.data.result,
                })
            }
        })


    }

    render() {
        const startPage = (<View className='startBG' ></View>)
        const tabList = [{ title: '个性推荐' }, { title: '主播电台' }]
        return (
            <View>
                {
                    // this.state.showStartPage ? 'true' : ''
                }
                <View className='discovery-container'>
                    {/* 搜索 */}
                    <TopSearch></TopSearch>
                    {/* swiper1 */}
                    <Swiper
                        className='selfhoodSwiper'
                        indicatorColor='#999'
                        indicatorActiveColor='#333'
                        circular
                        indicatorDots
                        autoplay
                    >
                        {
                            this.state.selfhoodBanners.map((item, index) => {
                                return (
                                    <SwiperItem key={index}>
                                        <View className='item-container'>
                                            <View className='item' style={{
                                                background: "url(" + item.imageUrl + ")", backgroundPosition: "center",
                                                backgroundSize: "cover", backgroundRepeat: "no-repeat"
                                            }}></View>
                                        </View>
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>

                    {/* tabs */}
                    <AtTabs
                        className='ouch'
                        heigh={100}
                        current={this.state.currentTab} tabList={tabList} onClick={this.handleSwitchTabs.bind(this)}>
                        <AtTabsPane current={this.state.currentTab} index={0} >
                            <View className='classification'>
                                <View>
                                    <View className='category'>
                                        <View className='FM'></View>
                                    </View>
                                    <Text>私人FM</Text>
                                </View>
                                <View>
                                    <View className='category'>
                                        <View className='recommend'></View>
                                    </View>
                                    <Text>每日推荐</Text>
                                </View>
                                <View>
                                    <View className='category'>
                                        <View className='music-list'></View>
                                    </View>
                                    <Text>歌单</Text>
                                </View>
                                <View>
                                    <View className='category'>
                                        <View className='rank-list'></View>
                                    </View>
                                    <Text>排行版</Text>
                                </View>
                            </View>

                            <List list={this.state.recommendMusicList} title='推荐歌单'></List>
                            <List list={this.state.newsong} title='最新音乐'></List>
                            <List list={this.state.djprogram} title='主播电台'></List>

                            {
                                this.state.showStartPage ? '233' : ''
                            }
                        </AtTabsPane>
                        <AtTabsPane current={this.state.currentTab} index={1}>
                            <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                        </AtTabsPane>
                    </AtTabs>
                </View>
            </View >
        )
    }
}

export default Index
