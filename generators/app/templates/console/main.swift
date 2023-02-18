/*
 * <%= swiftProject %>
 *
 */

// TODO: Add Copyright and License

/*
 * For example, you can remove
#if os(Linux)
import Glibc
#else
import Darwin
#endif
*/

/// A sample greeting function.
///
/// - Parameters:
///     - name: The greeting String
func greeting(name : String) { print("Hello, \(name) !") }

/// The "Main" calls the greeting function
if Process
  .arguments.count != 2 { print("Usage: hello NAME") }
else {
  let name = Process.arguments[1] greeting(name)
}
