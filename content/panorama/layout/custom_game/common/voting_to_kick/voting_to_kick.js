var bVotingIsNow = false

function print(data){
	$.Msg(data)
}
function VotingToKickShowVoting(data){
	print("SHOW VOTING")
	var timerVoting = $.CreatePanel( "Panel", $( "#VotingToKickVoting" ), "VotingToKickCountdown" )
	timerVoting.AddClass("Active")
	var votingPanel = $("#VotingToKickVoting");
	votingPanel.AddClass("Slide")
	var targetPlayer = Game.GetPlayerInfo( data.playerId );

	$("#VotingToKickVotingReasonText").text = $.Localize("#voting_to_kick_reason_tooltip")+": "+$.Localize("#voting_to_kick_reason_"+data.reason)

	var votingPanelHideText = $("#VotingToKickVotingHeadText");
	votingPanelHideText.html=true
	votingPanelHideText.text = "Kick "+"<font color='#ed1313'>" + targetPlayer.player_name + "</font>"+" ?";
	var votingPanelModelHero = $("#VotingToKickVotingHeroModel");
	$("#VotingToKickModelPanel").BCreateChildren("<DOTAScenePanel hittest=\"false\" id=\"VotingToKickVotingHeroModel\" style=\"width:210px;height:210px;\" unit=\""+targetPlayer.player_selected_hero+"\" particleonly=\"false\"/>")

	if(Game.GetLocalPlayerID() != data.playerIdInit){
		$("#VotingToKickVotingYes").visible = true
    	$("#VotingToKickVotingNo").visible = true
	}else{
		$("#VotingToKickVotingYes").visible = false
		$("#VotingToKickVotingNo").visible = false
	}
}


function VotingToKickHideVoting(data){
	print("HIDE VOTING")
	$("#VotingToKickVotingYes").visible = false
	$("#VotingToKickVotingNo").visible = false
	$("#VotingToKickCountdown").DeleteAsync(0)

	var votingPanel = $("#VotingToKickVoting");
	votingPanel.RemoveClass("Slide")
}

function VotingToKickVoteYes(data){
	print("YES VOTING")
	GameEvents.SendCustomGameEventToServer("voting_to_kick_vote_yes", {});
	$("#VotingToKickVotingYes").visible = false
	$("#VotingToKickVotingNo").visible = false
}

function VotingToKickVoteNo(data){
	print("NO VOTING")
	$("#VotingToKickVotingYes").visible = false
	$("#VotingToKickVotingNo").visible = false
}

function VotingToKickHideReason(){
	print("HIDE REASON")
	var reasonPanel = $("#VotingToKickReasonPanel");
	reasonPanel.RemoveClass("Slide")
}
function VotingToKickShowReason(data){
	print("SHOW REASON")
	var reasonPanel = $("#VotingToKickReasonPanel");
	reasonPanel.AddClass("Slide")

	var reasonPanelHideText = $("#VotingToKickReasonHeadPanelText");
	reasonPanelHideText.html=true
	var targetPlayer = Game.GetPlayerInfo( data.playerId );
	reasonPanelHideText.text = "Choose a reason to kick "+"<font color='#23d923'>" + targetPlayer.player_name + "</font>";

}
function VotingToKickInitVoting(reason){
	print("PICK REASON")
 	GameEvents.SendCustomGameEventToServer("voting_to_kick_reason_is_picked", {reason:reason});
}

function VotingToKickInit(){
	GameEvents.SendCustomGameEventToServer("voting_to_kick_check_voting_state", {});
	GameEvents.Subscribe('voting_to_kick_show_reason', VotingToKickShowReason);
	GameEvents.Subscribe('voting_to_kick_hide_reason', VotingToKickHideReason);

	GameEvents.Subscribe('voting_to_kick_show_voting', VotingToKickShowVoting);
	GameEvents.Subscribe('voting_to_kick_hide_voting', VotingToKickHideVoting);
}
VotingToKickInit();
