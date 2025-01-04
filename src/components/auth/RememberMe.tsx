export function RememberMe() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          className="w-4 h-4 rounded border-gray-700 bg-gray-800/50"
        />
        <label htmlFor="remember" className="text-sm text-gray-400">Remember me</label>
      </div>
      <a href="#" className="text-sm text-purple-400 hover:text-purple-300">Forgot password?</a>
    </div>
  );
}