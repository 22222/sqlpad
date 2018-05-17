import React from 'react'
import PropTypes from 'prop-types'

import Tag from 'antd/lib/tag'
import Icon from 'antd/lib/icon'
import AutoComplete from 'antd/lib/auto-complete'
import 'antd/lib/tag/style/css'
import 'antd/lib/auto-complete/style/css'
import 'antd/lib/icon/style/css'

class EditableTagGroup extends React.Component {
  state = {
    inputVisible: false,
    inputValue: ''
  }

  handleClose = removedTag => {
    const { onChange, tags } = this.props
    const newTags = tags.filter(tag => tag !== removedTag)
    onChange(newTags)
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleInputChange = value => {
    this.setState({ inputValue: value })
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state
    let { tags, onChange } = this.props

    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }

    this.setState(
      {
        inputVisible: false,
        inputValue: ''
      },
      () => {
        onChange(tags)
      }
    )
  }

  saveInputRef = input => (this.input = input)

  filterOption = (inputValue, option) =>
    option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1

  render() {
    const { tags, tagOptions } = this.props
    const { inputVisible, inputValue } = this.state

    const dataSource = tagOptions.slice()
    if (inputValue && dataSource.indexOf(inputValue) === -1) {
      dataSource.unshift(inputValue)
    }

    return (
      <div>
        {tags.map((tag, index) => {
          return (
            <Tag
              key={tag}
              closable={true}
              afterClose={() => this.handleClose(tag)}
            >
              {tag}
            </Tag>
          )
        })}
        {inputVisible && (
          <AutoComplete
            style={{ width: 140 }}
            dataSource={dataSource}
            ref={this.saveInputRef}
            filterOption={this.filterOption}
            type="text"
            size="small"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onSelect={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
    )
  }
}

EditableTagGroup.propTypes = {
  onChange: PropTypes.func,
  tagOptions: PropTypes.array,
  tags: PropTypes.array
}

EditableTagGroup.defaultProps = {
  onChange: () => {},
  tagOptions: [],
  tags: []
}

export default EditableTagGroup
