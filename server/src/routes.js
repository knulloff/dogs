const express = require('express');
const { CreateUser, UpdateUser, FindUser, ReferredBy, UpdateGamePlayTime, ReferLeaderboardList, TransactionTask, InviteTask, Invite10Task, Statistic } = require('./user/User.Controller');
const { LeaderboardByPoints, PointTableByUserId, LeaderboardByPointsAdmin, UpdatePoint} = require('./point/Point.Controller');
const { CreateNewTask, TaskList, UpdateTask, AdminTaskList } = require('./task/Task.Controller');
const { CompleteTask } = require('./task_completed/TaskComplete.Controller');
const { MakeWithdraw, GetAllList, CancelWithdraw, MarkAsPaid, Recheck, GetLastWithdraw } = require('./withdraw/Withdraw.Controller');
const { MatchSecretCode } = require('./setting/Setting.Controller');
const { NewTapInstance, MarkAllAsClaim, GetRedeemAblePoint } = require('./game_point/Game.Controller');

const MainRoutes = express.Router();

MainRoutes.post('/create-account', CreateUser);
MainRoutes.get('/find-account', FindUser);
MainRoutes.put('/update-account', UpdateUser);
MainRoutes.get('/leaderboard', LeaderboardByPoints);
MainRoutes.get('/statistic', Statistic);
MainRoutes.get('/admin/leaderboard', LeaderboardByPointsAdmin);
MainRoutes.post('/create-task', CreateNewTask);
MainRoutes.post('/complete-task', CompleteTask);
MainRoutes.get('/task-list', TaskList);
MainRoutes.get('/point-table', PointTableByUserId);
MainRoutes.put('/referred-someone', ReferredBy);
MainRoutes.post('/make-withdraw', MakeWithdraw);
MainRoutes.post('/make-withdraw', MakeWithdraw);
MainRoutes.put('/update-task', UpdateTask);

// Tap

// Request for every single click
MainRoutes.post('/new-tap', NewTapInstance);
// Requst for claim all unclaim
MainRoutes.post('/claim-game-point', MarkAllAsClaim);
// retrive how much point you will able to claim
MainRoutes.get('/claimable-point', GetRedeemAblePoint);
MainRoutes.get('/refer-list', ReferLeaderboardList);

MainRoutes.get('/admin/withdraw-status', GetLastWithdraw);
MainRoutes.get('/admin/task', AdminTaskList);
MainRoutes.post('/admin/login', MatchSecretCode);
MainRoutes.get('/admin/withdraw-list', GetAllList);
MainRoutes.put('/admin/cancel-withdraw', CancelWithdraw);
MainRoutes.put('/admin/recheck-withdraw', Recheck);
MainRoutes.put('/admin/paid-withdraw', MarkAsPaid);
MainRoutes.put('/admin/update-point', UpdatePoint);
MainRoutes.put('/admin/update-game-time', UpdateGamePlayTime);

MainRoutes.put('/transection/complete', TransactionTask);
MainRoutes.put('/invite/complete', InviteTask);


module.exports = MainRoutes;