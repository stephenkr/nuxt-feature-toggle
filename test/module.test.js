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

    it('should return true if the query string matches and is enabled', () => {
      const wrapper = getWrapper({
        extraQuery: {
          'toggle_my-unique-toggle': 'true'
        },
        extraFeatureToggle: {
          queryString: true
        }
      })

      const actual = wrapper.vm.canShow

      expect(actual).toBe(true)
    })
  })

  describe('canShowWithQueryString', () => {
    it('should return true if the query string matches', () => {
      const wrapper = getWrapper({
        extraQuery: {
          'toggle_my-unique-toggle': 'true'
        },
        extraFeatureToggle: {
          queryString: true
        }
      })

      const actual = wrapper.vm.canShowWithQueryString

      expect(actual).toBe(true)
    })
  })

  describe('queryStringKey', () => {
    it('should return the correct key', () => {
      const wrapper = getWrapper()

      const actual = wrapper.vm.queryStringKey

      expect(actual).toBe('toggle_my-unique-toggle')
    })
  })

  describe('queryString', () => {
    it('should return the true if the query string is enabled', () => {
      const wrapper = getWrapper({
        extraFeatureToggle: {
          queryString: true
        }
      })
      const actual = wrapper.vm.queryString

      expect(actual).toBe(true)
    })

    it('should return the false if the query string is disabled', () => {
      const wrapper = getWrapper({
        extraFeatureToggle: {
          queryString: false
        }
      })
      const actual = wrapper.vm.queryString

      expect(actual).toBe(false)
    })
  })

  describe('isQueryStringAllowed', () => {
    it('should return true if is allowed', () => {
      const wrapper = getWrapper({
        extraFeatureToggle: {
          queryString: true,
          isQueryStringAllowedFn: () => true
        }
      })

      const actual = wrapper.vm.isQueryStringAllowed

      expect(actual).toBe(true)
    })

    it('should return false if not allowed', () => {
      const wrapper = getWrapper({
        extraFeatureToggle: {
          queryString: true,
          isQueryStringAllowedFn: () => false
        }
      })

      const actual = wrapper.vm.isQueryStringAllowed

      expect(actual).toBe(false)
    })
  })
})
