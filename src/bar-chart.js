import React from 'react'
import {View} from 'react-native'
import {Svg, Rect, G} from 'react-native-svg'
import AbstractChart from './abstract-chart'

const barWidth = 32

class BarChart extends AbstractChart {
  renderBars = config => {
    const {data, width, height, paddingTop, paddingRight} = config
    const baseHeight = this.calcBaseHeight(data, height)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      const barWidth = 32
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={
            ((barHeight > 0 ? baseHeight - barHeight : baseHeight) / 4) * 3 +
            paddingTop
          }
          width={barWidth}
          height={(Math.abs(barHeight) / 4) * 3}
          fill="url(#fillShadowGradient)"
        />
      )
    })
  }

  renderBarTops = config => {
    const {data, width, height, paddingTop, paddingRight} = config
    const baseHeight = this.calcBaseHeight(data, height)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      )
    })
  }

  render() {
    const {width, height, data, style = {}, hideYAxis} = this.props
    const paddingTop = 16
    const paddingRight = hideYAxis ? 0 : 64
    const {borderRadius = 0} = style
    const config = {
      width,
      height
    }
    return (
      <View style={style}>
        <Svg height={height} width={width}>
          {this.renderDefs({
            ...config,
            ...this.props.chartConfig
          })}
          <Rect
            width="100%"
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G>
            {this.renderHorizontalLines({
              ...config,
              count: 4,
              paddingTop
            })}
          </G>

          {!hideYAxis &&
            <G>
              {this.renderHorizontalLabels({
                ...config,
                count: 4,
                data: data.datasets[0].data,
                paddingTop,
                paddingRight
              })}
            </G>
          }
          
          <G>
            {this.renderVerticalLabels({
              ...config,
              labels: data.labels,
              paddingRight,
              paddingTop,
              horizontalOffset: barWidth
            })}
          </G>
          <G>
            {this.renderBars({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
          <G>
            {this.renderBarTops({
              ...config,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight
            })}
          </G>
        </Svg>
      </View>
    )
  }
}

export default BarChart
