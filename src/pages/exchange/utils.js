export default class TableUtils {
	/**
	 * This function get first character 
     * then compare to the value
	 * @param {str} string
	 * @returns {boolean}
	 */
	static ifFirstCharEqualsToValue(str, compare) {

        return str.charAt(0) === compare;
	};
}
