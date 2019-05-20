import { shallowMount } from '@vue/test-utils'
import FeatureToggle from '../lib/feature-toggle.vue'

const propsData = {
  name: 'my-unique-toggle',
  value: true
}

const getWrapper = ({ extraFeatureToggle, extraQuery, extraPropsData } = {}) =>
  shallowMount(FeatureToggle, {
    propsData: {
      ...propsData,
      ...extraPropsData
    },
    mocks: {
      $route: {
        query: {
          ...extraQuery
        }
      },
      $featureToggle: {
        ...extraFeatureToggle,
        toggles: {
          'my-unique-toggle': true
        }
      }
    }
  })

describe('FeatureToggle', () => {
  describe('canShow', () => {
    test('ensure it shows for the correct toggle', () => {
      const wrapper = getWrapper()

      const actual = wrapper.vm.canShow

      expect(actual).toBe(true)
    })

    test('ensure it does not show if the toggle is not a match', () => {
      const wrapper = getWrapper({
        extraPropsData: {
          value: false
        }
      })

      const actual = wrapper.vm.canShow

      expect(actual).toBe(false)
    })
  })

  describe('canShowWithQueryString', () => {
    it('should return true if the query string matches', () => {

    })
  })
})
