--[[
Created by zgr2575

For any assistance create a thread in qbot help.
]]

local commandPrefix = "!" -- Set this to your desired command prefix
local groupId = 11717434 -- Set this to your desired group ID
local secretsEnabled = true -- If you're using secrets set this to true (Recommended)
local server = '' -- URL of your QBOT instance, e.g., http://iporhostname:3001/

local secrets = {
	apikey = '', -- Set this as the name of the secret holding your API key.
}

local apiKey = '' -- Replace with your actual API key (secrets must be disabled)

-- Define command permissions
local commandPermissions = {
	promote = {['Group Rank'] = 0, ['Tolerance Type'] = '>='},
	demote = {['Group Rank'] = 0, ['Tolerance Type'] = '>='},
	setrank = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	shout = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	fire = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	suspend = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	unsuspend = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	addxp = {['Group Rank'] = 255, ['Tolerance Type'] = '>='},
	removexp = {['Group Rank'] = 255, ['Tolerance Type'] = '>='}
}

--[[

End of Configuration

Do not touch anything past this point unless you know what you're doing.

]]--

local HttpService = game:GetService('HttpService')
local Players = game:GetService('Players')

-- Retrieve API key if secrets are enabled
if secretsEnabled then
	local success, result = pcall(function() return HttpService:GetSecret(secrets.apikey) end)
	if success then
		apiKey = result
		print("Successfully retrieved API key secret.")
	else
		warn("Failed to retrieve secret with key: " .. secrets.apiKey)
	end
end

local function checkCommandPermission(player, command)
	local perm = commandPermissions[command]
	if not perm then return false end

	local playerRank = player:GetRankInGroup(groupId)
	if perm['Tolerance Type'] == '>=' and playerRank >= perm['Group Rank'] then
		return true
	elseif perm['Tolerance Type'] == '<=' and playerRank <= perm['Group Rank'] then
		return true
	elseif perm['Tolerance Type'] == '==' and playerRank == perm['Group Rank'] then
		return true
	end

	return false
end

local function postRequest(endpoint, data)
	local headers = {
		["Content-Type"] = "application/json",
		["Authorization"] = apiKey 
	}
	local options = {
		Url = server .. endpoint,
		Method = "POST",
		Headers = headers,
		Body = HttpService:JSONEncode(data) -- Send data in JSON format
	}
	local success, response = pcall(function()
		return HttpService:RequestAsync(options)
	end)
	if success then
		if response.Success then
			print("Response Status Code: " .. response.StatusCode)
			print("Response Body: " .. response.Body)
			return response
		else
			warn("Request failed with status code: " .. response.StatusCode)
			warn("Response Body: " .. response.Body)
		end
	else
		warn("HTTP request failed: " .. tostring(response))
	end
end


local function getUserIdFromUsername(username)
	local success, result = pcall(function()
		return Players:GetUserIdFromNameAsync(username)
	end)
	if success then
		return result
	else
		warn("Failed to get user ID from username: " .. tostring(result))
		return nil
	end
end

-- Slice a table from a given start to end index
local function slice(tbl, first, last, step)
	local sliced = {}
	for i = first or 1, last or #tbl, step or 1 do
		sliced[#sliced + 1] = tbl[i]
	end
	return sliced
end

-- Handle player commands
game.Players.PlayerAdded:Connect(function(player)
	player.Chatted:Connect(function(msg)
		local args = msg:split(" ")
		local command = args[1]:sub(1, #commandPrefix)

		if command == commandPrefix then
			local cmd = args[1]:sub(#commandPrefix + 1)

			if checkCommandPermission(player, cmd) then
				if cmd == "setrank" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					local rank = table.concat(slice(args, 3), ' ')
					if userId and rank and userId ~= player.UserId then
						postRequest('setrank', {id = userId, role = rank})
					end
				elseif cmd == "promote" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					if userId and userId ~= player.UserId then
						postRequest('promote', {id = userId})
					end
				elseif cmd == "demote" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					if userId and userId ~= player.UserId then
						postRequest('demote', {id = userId})
					end
				elseif cmd == "fire" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					if userId and userId ~= player.UserId then
						postRequest('fire', {id = userId})
					end
				elseif cmd == "shout" then
					table.remove(args, 1)
					local message = table.concat(args, ' ')
					postRequest('shout', {content = message})
				elseif cmd == "suspend" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					local duration = tonumber(args[3])
					if userId and duration and userId ~= player.UserId then
						postRequest('suspend', {id = userId, duration = duration})
					end
				elseif cmd == "unsuspend" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					if userId and userId ~= player.UserId then
						postRequest('unsuspend', {id = userId})
					end
				elseif cmd == "addxp" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					local amount = tonumber(args[3])
					if userId and amount and userId ~= player.UserId then
						postRequest('xp/add', {id = userId, amount = amount})
					end
				elseif cmd == "removexp" then
					local username = args[2]
					local userId = getUserIdFromUsername(username)
					local amount = tonumber(args[3])
					if userId and amount and userId ~= player.UserId then
						postRequest('xp/remove', {id = userId, amount = amount})
					end
				end
			end
		end
	end)
end)
