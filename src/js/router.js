import Login from '@/components/routerview/login.vue';
import Home from '@/components/routerview/home.vue';
import Content from '@/components/routerview/content.vue';
import HomeManage from '@/components/nav1/home/homemanage.vue';
import HomeManageBanner from '@/components/nav1/home/homemanage-banner.vue';
import HomeManageBannerCreate from '@/components/nav1/home/homemanage-banner-create.vue';
import HomeManageLinkSelect from '@/components/nav1/home/homemanage-select.vue';
//import HomeLinkSelectArticle from '@/components/nav1/home/homemanage-select-article.vue';
//import HomeLinkSelectActi from '@/components/nav1/home/homemanage-select-activity.vue';
import HomeManageRecomment from '@/components/nav1/home/homemanage-recomment.vue';
import NewsList from '@/components/nav1/article/news/newslist.vue';
import NewsPublished from '@/components/nav1/article/news/news-published.vue';
import NewsDraft from '@/components/nav1/article/news/news-draft.vue';
import NewsUnline from '@/components/nav1/article/news/news-unline.vue';
import NewsCreate from '@/components/nav1/article/news/newscreate.vue';
import NewsEditor from '@/components/nav1/article/news/newseditor.vue';
import NewsPreview from '@/components/nav1/article/news/newspreview.vue';
import NewsAuthor from '@/components/nav1/article/news/select-author.vue';
import MediaCreate from '@/components/nav1/article/news/create-media.vue';
import PolicyList from '@/components/nav1/article/policy/policylist.vue';
import PolicyPublished from '@/components/nav1/article/policy/policy-published.vue';
import PolicyDraft from '@/components/nav1/article/policy/policy-draft.vue';
import PolicyUnline from '@/components/nav1/article/policy/policy-unline.vue';
import PolicyCreate from '@/components/nav1/article/policy/policycreate.vue';
import ReportList from '@/components/nav1/article/report/reportlist.vue';
import ReportHandle from '@/components/nav1/article/report/reportlist-handle.vue';
import ReportNohandle from '@/components/nav1/article/report/reportlist-nohandle.vue';
import Reportdetail from '@/components/nav1/article/report/report-detail.vue';
import MediaList from '@/components/nav1/article/media/medialist.vue';
import NewsMediaDetail from '@/components/nav1/article/media/media-detail.vue';
import ActivityList from '@/components/nav1/activity/activitylist.vue';
import ActivityManage from '@/components/nav1/activity/activitymanage.vue';
import ActivityListAll from '@/components/nav1/activity/activitylist-all.vue';
import ActivityListOnline from '@/components/nav1/activity/activitylist-online.vue';
import ActivityListCancel from '@/components/nav1/activity/activitylist-cancel.vue';
import ActivityListUnline from '@/components/nav1/activity/activitylist-unline.vue';
import ActivityListDraft from '@/components/nav1/activity/activitylist-draft.vue';
import ActivityCreate from '@/components/nav1/activity/activitycreate.vue';
import ActivityPreview from '@/components/nav1/activity/activitypreview.vue';
import ActivityAudit from '@/components/nav1/activity/activityaudit.vue';
import ActivityCheck from '@/components/nav1/activity/activity-check.vue';
import ActivityNocheck from '@/components/nav1/activity/activity-nocheck.vue';
import ActivityCheckDetail from '@/components/nav1/activity/activitycheckdetail.vue';
import ActivityReport from '@/components/nav1/activity/activityreport.vue';
import ActivityReportDetail from '@/components/nav1/activity/activityreport-detail.vue';
import ActivityNohandle from '@/components/nav1/activity/activityreport-nohandle.vue';
import ActivityHandle from '@/components/nav1/activity/activityreport-handle.vue';
import ActivityEnroll from '@/components/nav1/activity/activityenroll.vue';
import ActivityEnrollDeatil from '@/components/nav1/activity/activityenroll-detail.vue';
import DynamicLists from '@/components/nav1/dynamic/dynamic.vue';
import DynamicListUnline from '@/components/nav1/dynamic/dynamiclist-unline.vue';
import DynamicList from '@/components/nav1/dynamic/dynamiclist-list.vue';
import DynamicListManage from '@/components/nav1/dynamic/dynamic-manage.vue';
import DynamicCreate from '@/components/nav1/dynamic/dynamic-create.vue';
import Topic from '@/components/nav1/dynamic/topic.vue';
import TopicList from '@/components/nav1/dynamic/topiclist-list.vue';
import TopicListUnline from '@/components/nav1/dynamic/topiclist-unline.vue';
import DynamicTopicDetail from '@/components/nav1/dynamic/topic-detail.vue';
import DynamicTopicCreate from '@/components/nav1/dynamic/topic-create.vue';
import DynamicReply from '@/components/nav1/dynamic/reply.vue';
import DynamicReplyList from '@/components/nav1/dynamic/reply-list.vue';
import DynamicReplyListUnline from '@/components/nav1/dynamic/reply-unline.vue';
import DynamicReplyDetail from '@/components/nav1/dynamic/reply-manage.vue';
import DynamicReport from '@/components/nav1/dynamic/report.vue';
import DynamicReportDynamic from '@/components/nav1/dynamic/report-dynamic.vue';
import DynamicReportReply from '@/components/nav1/dynamic/report-reply.vue';
import DynamicReportDetail from '@/components/nav1/dynamic/report-manage.vue';
import ArticleComment from '@/components/nav1/comment/articlecomment.vue';
import ArticleCommentList from '@/components/nav1/comment/articlecomment-list.vue';
import ArticleCommentReport from '@/components/nav1/comment/articlecomment-report.vue';
import ArticleCommentUnline from '@/components/nav1/comment/articlecomment-unline.vue';
import ArticleCommentManage from '@/components/nav1/comment/articlecomment-manage.vue';
import ActivityComment from '@/components/nav1/comment/activitycomment.vue';
import ActivityCommentList from '@/components/nav1/comment/activitycomment-list.vue';
import ActivityCommentReport from '@/components/nav1/comment/activitycomment-report.vue';
import ActivityCommentUnline from '@/components/nav1/comment/activitycomment-unline.vue';
import ActivityCommentManage from '@/components/nav1/comment/activitycomment-manage.vue';
import ArticleReplayComment from '@/components/nav1/replay/article.vue';
import ArticleReplayCommentList from '@/components/nav1/replay/article-list.vue';
import ArticleReplayCommentReport from '@/components/nav1/replay/article-report.vue';
import ArticleReplayCommentUnline from '@/components/nav1/replay/article-unline.vue';
import ArticleReplayCommentManage from '@/components/nav1/replay/article-manage.vue';
import ActivityReplayComment from '@/components/nav1/replay/activity.vue';
import ActivityReplayCommentList from '@/components/nav1/replay/activity-list.vue';
import ActivityReplayCommentReport from '@/components/nav1/replay/activity-report.vue';
import ActivityReplayCommentUnline from '@/components/nav1/replay/activity-unline.vue';
import ActivityReplayCommentManage from '@/components/nav1/replay/activity-manage.vue';
import VestManage from '@/components/nav1/vest/vestmanage.vue';
import VestManageList from '@/components/nav1/vest/vestmanage-list.vue';
import VestManageDisabled from '@/components/nav1/vest/vestmanage-disabled.vue';
import VestManageManage from '@/components/nav1/vest/vestmanage-manage.vue';
import InformationMessage from '@/components/nav1/information/message.vue';
import InformationMessageCreate from '@/components/nav1/information/message-create.vue';
import InformationMessageList from '@/components/nav1/information/message-list.vue';
import InformationMessageModify from '@/components/nav1/information/message-modify.vue';
import InformationMessageDetail from '@/components/nav1/information/message-detail.vue';
import InformationPush from '@/components/nav1/information/push.vue';
import InformationPushCreate from '@/components/nav1/information/push-create.vue';
import InformationPushSelect from '@/components/nav1/information/pushSelect.vue';
import InformationPushList from '@/components/nav1/information/push-list.vue';
import InformationPushModify from '@/components/nav1/information/push-modify.vue';
import InformationPushDetail from '@/components/nav1/information/push-detail.vue';
import InformationSystem from '@/components/nav1/information/system.vue';
import InformationSystemCreate from '@/components/nav1/information/system-create.vue';
import InformationSystemList from '@/components/nav1/information/system-list.vue';
import InformationSystemModify from '@/components/nav1/information/system-modify.vue';
import InformationSystemDetail from '@/components/nav1/information/system-detail.vue';
import AccountPersonal from '@/components/nav2/account/personal.vue';
import AccountPersonalUser from '@/components/nav2/account/personal-personaluser.vue';
import AccountPersonalCreate from '@/components/nav2/account/personal-create.vue';
import AccountPersonalManage from '@/components/nav2/account/personal-manage.vue';
import AccountPersonalSettled from '@/components/nav2/account/personal-settled.vue';
import AccountParkUser from '@/components/nav2/account/personal-parkuser.vue';
import AccountEnterprise from '@/components/nav2/account/enterprise.vue';
import AccountEnterpriseUser from '@/components/nav2/account/enterprise-user.vue';
import AccountEnterpriseApprove from '@/components/nav2/account/enterprise-approve.vue';
import AccountEnterprisePark from '@/components/nav2/account/enterprise-park.vue';
import ApproveManage from '@/components/nav2/approve/approve.vue';
import ApproveNocheck from '@/components/nav2/approve/approve-nocheck.vue';
import ApproveCheck from '@/components/nav2/approve/approve-check.vue';
import SettledPersonal from '@/components/nav2/settled/personal.vue';
import SettledPersonalSettled from '@/components/nav2/settled/personal-settled.vue';
import SettledPersonalMoveout from '@/components/nav2/settled/personal-moveout.vue';
import SettledEnterprise from '@/components/nav2/settled/enterprise.vue';
import SettledEnterpriseNocheck from '@/components/nav2/settled/enterprise-nocheck.vue';
import SettledEnterpriseCheck from '@/components/nav2/settled/enterprise-check.vue';
import privilegeUser from '@/components/nav2/privilege/user.vue';
import privilegeUserManage from '@/components/nav2/privilege/user-manage.vue';
import privilegeRole from '@/components/nav2/privilege/role.vue';


export default [
  {
    path: '',
    redirect: to => { return '/login'; },
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/nav1',
    name: '内容管理',
    component: Home,
    children: [
      { 
        path: '', 
        redirect: to => { return 'article'; },
        hidden: true
      },
      {
        path: 'home',
        name: '首页管理',
        icon: 'home',
        component: Content,
        leaf: true,//只有一个节点
        children: [
          {
            path: '',
            redirect: to => { return 'manage' },
            hidden: true
          },
          {
            path: 'manage',
            name: '首页管理',
            component: HomeManage,
            children: [
              { path: '', redirect: to => { return 'banner' }, hidden: true } ,
              { path: 'banner', name: '轮播图管理', component: HomeManageBanner, hidden: true },
              { path: 'recomment', name: '推荐管理', component: HomeManageRecomment, hidden: true }
            ]
          },
          { path: 'manage/banner-create', name: '轮播图管理', component: HomeManageBannerCreate, hidden: true },
          { path: 'manage/linkselect', name: '链接选择', component: HomeManageLinkSelect, hidden: true }
        ]
      },
      { 
        path: 'article',
        name: '文章管理',
        icon: 'file-text',
        component: Content,
        children: [
          {
            path: '',
            redirect: to => { return 'news'; },
            hidden: true
          },
          { 
            path: 'news',
            name: '资讯管理',
            component: Content,
            children:[
              { 
                path: '', 
                redirect: to => { return 'newslist'; }, 
                hidden: true 
              },
              { 
                path: 'newslist', 
                name: '资讯列表',
                component: NewsList, 
                hidden:true,
                children: [
                  { path: '', redirect: to => { return 'published'; }, hidden: true },
                  { path: 'published', name: '已发布', component: NewsPublished, hidden: true },
                  { path: 'draft', name: '草稿', component: NewsDraft, hidden: true },
                  { path: 'unline', name: '已下架', component: NewsUnline, hidden: true }
                ]
              },
              { path: 'newscreate', name: '新建资讯', component: NewsCreate, hidden: true },
              { path: 'newseditor', name: '资讯编辑', component: NewsEditor, hidden: true },
              { path: 'newspreview', name: '预览', component: NewsPreview, hidden: true },
              { path: 'selectauthor', name: '选择作者', component: NewsAuthor, hidden: true },
              { path: 'createmedia', name: '创建媒体', component: MediaCreate, hidden: true }
            ]
          },
          { 
            path: 'policy', 
            name: '政策管理', 
            component: Content,
            children:[
              { 
                path: '', 
                redirect: to => { return 'policylist'; },
                hidden: true 
              },
              { 
                path: 'policylist', 
                name: '政策列表', 
                component: PolicyList, 
                hidden: true,
                children: [
                  { path: '', redirect: to => { return 'published'; }, hidden: true },
                  { path: 'published', name: '已发布', component: PolicyPublished, hidden: true },
                  { path: 'draft', name: '草稿', component: PolicyDraft, hidden: true },
                  { path: 'unline', name: '已下架', component: PolicyUnline, hidden: true }
                ]
              },
              { path: 'policycreate', name: '新建政策', component: PolicyCreate, hidden: true },
            ]
          },
          { 
            path: 'report', 
            name: '举报管理', 
            component: Content,
            children:[
              {
                path: '', 
                redirect: to => { return 'reportlist'; }, 
                hidden: true 
              },
              {
               path: 'reportlist',
               name: '举报列表',
               component: ReportList, 
               hidden:true,
                children: [
                  { path: '', redirect: to => { return 'nohandle'; }, hidden: true },
                  { path: 'nohandle', name: '未处理', component: ReportNohandle, hidden: true },
                  { path: 'handle', name: '已处理', component: ReportHandle, hidden: true }
                ]
              },
              { path: 'reportdetail', name: '举报详情', component: Reportdetail, hidden: true }
            ]
          },
          { 
            path: 'media', 
            name: '媒体管理', 
            component: Content,
            children:[
              { path: '', redirect: to => { return 'medialist'; }, hidden: true },
              { path: 'medialist', name: '媒体列表', component: MediaList, hidden: true,},
              { path: 'newsmediadetail', name: '媒体详情', component: NewsMediaDetail, hidden: true }
            ]
          },
          
        ]
      },
      {
        path: 'activity',
        name: '活动管理',
        icon: 'inbox',
        component: Content,
        children: [
          {
            path: '', 
            redirect: to => { return 'activitylist'; }, 
            hidden: true 
          },
          { 
            path: 'activitylist',
            name: '活动列表',
            component: ActivityList,
            children: [
              { path: '', redirect: to => { return 'all'; }, hidden: true },
              { path: 'all', name: '全部', component: ActivityListAll, hidden: true },
              { path: 'online', name: '已上架', component: ActivityListOnline, hidden: true },
              { path: 'cancel', name: '已取消', component: ActivityListCancel, hidden: true },
              { path: 'unline', name: '已下架', component: ActivityListUnline, hidden: true },
              { path: 'draft', name: '草稿', component: ActivityListDraft, hidden: true }
            ]
          },
          { path: 'activityaudit', name: '活动审核', component: ActivityAudit ,
            children: [
              { path: '', redirect: to => { return 'nocheck'; }, hidden: true },
              { path: 'nocheck', name: '未审核', component: ActivityNocheck, hidden: true },
              { path: 'check', name: '已审核', component: ActivityCheck, hidden: true },
            ]
          },
          { path: 'activityaudit/detail', name: '审核详情', component: ActivityCheckDetail, hidden: true },
          { path: 'activitylist/manage', name: '活动管理', component: ActivityManage, hidden: true },
          { path: 'activitylist/create', name: '创建活动', component: ActivityCreate, hidden: true },
          { path: 'activitylist/preview', name: '预览', component: ActivityPreview, hidden: true },
          { path: 'reportmanage', name: '举报管理', component: ActivityReport,
            children: [
              { path: '', redirect: to => { return 'nohandle'; }, hidden: true },
              { path: 'nohandle', name: '未处理', component: ActivityNohandle, hidden: true },
              { path: 'handle', name: '已处理', component: ActivityHandle, hidden: true },
            ]
          },
          { path: 'reportmanage/detail', name: '举报详情', component: ActivityReportDetail,hidden: true },
          { path: 'enrollmanage', name: '报名管理', component: ActivityEnroll },
          { path: 'enrollmanage/detail', name: '报名管理', component: ActivityEnrollDeatil,hidden: true }
        ] 
      },
      {
        path: 'dynamic',
        name: '动态管理',
        icon: 'life-ring',
        component: Content,
        children: [
          { 
            path: '',
            redirect: to => { return 'dynamiclist' }, 
            hidden: true 
          },
          {
            path: 'dynamiclist',
            name: '动态列表',
            component: DynamicLists,
            children: [
              {
                path: '',
                redirect: to => { return 'dynamiclist-self' }, 
                hidden: true 
              },
              {
                path: 'dynamiclist-self',
                name: '动态列表',
                component: DynamicList,
                hidden: true
              },
              {
                path:'dynamiclist-unline',
                name: '已下架',
                component: DynamicListUnline,
                hidden: true
              }
            ]
          },
          { path: 'dynamiclist/create', name: '创建动态', component: DynamicCreate, hidden: true },
          { path: 'dynamiclist/manage', name: '动态管理', component: DynamicListManage, hidden: true },
          { path: 'topiclist/create', name: '创建话题', component: DynamicTopicCreate, hidden: true },
          { path: 'topiclist/manage', name: '话题管理', component: DynamicTopicDetail, hidden: true },
          { path: 'replylist/manage', name: '回复管理', component: DynamicReplyDetail, hidden: true },
          { path: 'reportlist/manage', name: '举报管理', component: DynamicReportDetail, hidden: true },
          {
            path:'topiclist',
            name:'话题管理',
            component:Topic,
            children:[
              {
                path: '',
                redirect: to => { return 'topiclist-self' }, 
                hidden: true
              },
              {
                path:'topiclist-self',
                name: '话题列表',
                component:TopicList,
                hidden: true,
              },
              {
                path:'topiclist-unline',
                name: '已下架',
                component:TopicListUnline,
                hidden: true
              }
            ]
          },
          {
            path:'replylist',
            name:'回复管理',
            component:DynamicReply,
            children:[
              {
               path:'',
               redirect: to => { return 'replylist-self' }, 
               hidden: true
             },
             {
              path:'replylist-self',
              name:'回复管理',
               component:DynamicReplyList,
               hidden: true,
             },
             {
              path:'replylist-unline',
              name:'已下架',
              component:DynamicReplyListUnline, 
             },
            ]
          },
          {
            path:'reportlist',
            name:'举报管理',
            component:DynamicReport,
            children:[
              {
               path:'',
               redirect: to => { return 'reportlist-dynamic' }, 
               hidden: true
             },
             {
              path:'reportlist-dynamic',
              name:'动态举报',
               component:DynamicReportDynamic,
               hidden: true,
             },
             {
              path:'reportlist-reply',
              name:'回复举报',
              component:DynamicReportReply, 
             },
            ]
          }  
        ]
      },
      {
        path:'comment',
        name:'评论管理',
        icon: 'commenting',
        component: Content,
        children: [
          {
            path: '',
            redirect: to => { return 'article' },
            hidden: true
          },
          {
            path: 'article',
            name: '文章评论',
            component: ArticleComment,
            children: [
              { path: '', redirect: to => { return 'list' }, hidden: true } ,
              { path: 'list', name: '评论列表', component: ArticleCommentList, hidden: true },
              { path: 'report', name: '举报管理', component: ArticleCommentReport, hidden: true },
              { path: 'unline', name: '已下架', component: ArticleCommentUnline, hidden: true }
            ]
          },
          { path: 'article/manage', name: '文章评论管理', component: ArticleCommentManage, hidden: true },
          {
            path: 'activity',
            name: '活动评论',
            component: ActivityComment,
            children: [
              { path: '', redirect: to => { return 'list' }, hidden: true },
              { path: 'list', name: '评论列表', component: ActivityCommentList, hidden: true },
              { path: 'report', name: '举报管理', component: ActivityCommentReport, hidden: true },
              { path: 'unline', name: '已下架', component: ActivityCommentUnline, hidden: true }
            ]
          },
          { path: 'activity/manage', name: '活动评论管理', component: ActivityCommentManage, hidden: true }
        ]
      },
      {
        path:'replay',
        name:'回复管理',
        icon: 'comments',
        component: Content,
        children: [
          {
            path: '',
            redirect: to => { return 'article' }, 
            hidden: true
          },
          {
            path: 'article',
            name: '文章评论回复',
            component: ArticleReplayComment,
            children: [
              { path: '', redirect: to => { return 'list' }, hidden: true } ,
              { path: 'list', name: '回复列表', component: ArticleReplayCommentList, hidden: true },
              { path: 'report', name: '举报管理', component: ArticleReplayCommentReport, hidden: true },
              { path: 'unline', name: '已下架', component: ArticleReplayCommentUnline, hidden: true }
            ]
          },
          { path: 'article/manage', name: '文章评论回复管理', component: ArticleReplayCommentManage, hidden: true },
          {
            path: 'activity',
            name: '活动评论回复',
            component: ActivityReplayComment,
            children: [
              { path: '', redirect: to => { return 'list' }, hidden: true },
              { path: 'list', name: '回复列表', component: ActivityReplayCommentList, hidden: true },
              { path: 'report', name: '举报管理', component: ActivityReplayCommentReport, hidden: true },
              { path: 'unline', name: '已下架', component: ActivityReplayCommentUnline, hidden: true }
            ]
          },
          { path: 'activity/manage', name: '活动评论回复管理', component: ActivityReplayCommentManage, hidden: true },
        ]
      },
      {
        path: 'vest',
        name:'马甲管理',
        icon: 'user-secret',
        component: Content,
        leaf: true,//只有一个节点
        children: [
          {
            path: '',
            redirect: to => { return 'article' },
            hidden: true
          },
          {
            path: 'vestmanage',
            name: '马甲管理',
            component: VestManage,
            children: [
              { path: '', redirect: to => { return 'list' }, hidden: true } ,
              { path: 'list', name: '列表', component: VestManageList, hidden: true },
              { path: 'disabled', name: '已停用', component: VestManageDisabled, hidden: true }
            ]
          },
          { path: 'vestmanage/manage', name: '马甲管理', component: VestManageManage, hidden: true }
        ]
      },
      {
        path:'information',
        name:'消息管理',
        icon: 'bell',
        component: Content,
        children: [
          {
            path: '',
            redirect: to => { return 'message' }, 
            hidden: true
          },
          {
            path: 'message',
            name: '短信管理',
            component: InformationMessage,
            children: [
              { path: '', redirect: to => { return 'create' }, hidden: true } ,
              { path: 'create', name: '发送短信', component: InformationMessageCreate, hidden: true },
              { path: 'list', name: '已发短信', component: InformationMessageList, hidden: true }
            ]
          },
          {
            path: 'message/modify',
            name:'短信详情',
            component:InformationMessageModify,
            hidden:true
          },
          {
            path: 'message/detail',
            name:'短信详情',
            component:InformationMessageDetail,
            hidden:true
          },
          {
            path: 'push/select',
            name:'链接选择',
            component:InformationPushSelect,
            hidden:true
          },
          {
            path: 'push/modify',
            name:'推送消息',
            component:InformationPushModify,
            hidden:true
          },
          {
            path: 'push/detail',
            name:'推送消息详情',
            component:InformationPushDetail,
            hidden:true
          },
          {
            path: 'push',
            name: '推送管理',
            component: InformationPush,
            children: [
              { path: '', redirect: to => { return 'create' }, hidden: true },
              { path: 'create', name: '推送消息', component: InformationPushCreate, hidden: true },
              { path: 'list', name: '已发推送', component: InformationPushList, hidden: true }
            ]
          },
          {
            path: 'system/modify',
            name:'系统消息详情',
            component:InformationSystemModify,
            hidden:true
          },
          {
            path: 'system/detail',
            name:'系统消息详情',
            component:InformationSystemDetail,
            hidden:true
          },
          {
            path: 'system',
            name: '系统消息管理',
            component: InformationSystem,
            children: [
              { path: '', redirect: to => { return 'create' }, hidden: true },
              { path: 'create', name: '发送消息', component: InformationSystemCreate, hidden: true },
              { path: 'list', name: '消息管理', component: InformationSystemList, hidden: true }
            ]
          }
        ]
      },
    ]
  },
  {
    path: '/nav2',
    name: '用户管理',
    component: Home,
    children: [
      { 
        path: '',
        redirect: to => { return 'account'; },
        hidden: true
      },
      { 
        path: 'account', 
        name: '账户维护',
        icon: 'inbox',
        component: Content,
        children: [
          { 
            path: '', 
            redirect: to => { return 'personal'; }, 
            hidden: true 
          },
          { 
            path: 'personal', 
            name: '个人账户', 
            component: AccountPersonal,
            children: [
              { path: '', redirect: to => { return 'personal' }, hidden: true } ,
              { path: 'personal', name: '个人用户', component: AccountPersonalUser, hidden: true },
              { path: 'park', name: '园区用户', component: AccountParkUser, hidden: true }
            ]
          },
          { path: 'personal/create', name: '新建用户', component: AccountPersonalCreate, hidden: true },
          { path: 'personal/manage', name: '账户管理', component: AccountPersonalManage, hidden: true },
          { path: 'personal/settled', name: '员工入驻', component: AccountPersonalSettled, hidden: true },
          { 
            path: 'enterprise', 
            name: '企业账户', 
            component: AccountEnterprise,
            children: [
              { path: '', redirect: to => { return 'user' }, hidden: true } ,
              { path: 'user', name: '企业用户', component: AccountEnterpriseUser, hidden: true },
              { path: 'approve', name: '认证企业', component: AccountEnterpriseApprove, hidden: true },
              { path: 'park', name: '园区企业', component: AccountEnterprisePark, hidden: true }
            ]
          }
        ]  
      },
      { 
        path: 'approve',
        name: '认证管理',
        icon: 'inbox',
        component: Content,
        leaf: true,//只有一个节点
        children: [
          {
            path: '',
            redirect: to => { return 'manage' },
            hidden: true
          },
          {
            path: 'manage',
            name: '认证管理',
            component: ApproveManage,
            children: [
              { path: '', redirect: to => { return 'nocheck' }, hidden: true } ,
              { path: 'nocheck', name: '待审核', component: ApproveNocheck, hidden: true },
              { path: 'check', name: '已审核', component: ApproveCheck, hidden: true }
            ]
          }
        ]
      },
      {
        path: 'settled',
        name: '入驻管理',
        icon: 'inbox',
        component: Content,
        children: [
          { 
            path: '', 
            redirect: to => { return 'personal'; }, 
            hidden: true 
          },
          {
            path: 'personal', 
            name: '个人账户', 
            component: SettledPersonal,
            children: [
              { path: '', redirect: to => { return 'settled' }, hidden: true } ,
              { path: 'settled', name: '入驻用户', component: SettledPersonalSettled, hidden: true },
              { path: 'moveout', name: '迁出用户', component: SettledPersonalMoveout, hidden: true }
            ]
          },
          { 
            path: 'enterprise', 
            name: '企业账户', 
            component: SettledEnterprise,
            children: [
              { path: '', redirect: to => { return 'nocheck' }, hidden: true } ,
              { path: 'nocheck', name: '待审核', component: SettledEnterpriseNocheck, hidden: true },
              { path: 'check', name: '已审核', component: SettledEnterpriseCheck, hidden: true }
            ]
          }
        ]  
      },
      { 
        path: 'privilege', 
        name: '权限管理',
        icon: 'inbox',
        component: Content,
        children: [
          { 
            path: '', 
            redirect: to => { return 'user'; }, 
            hidden: true 
          },
          { 
            path: 'user',
            name: '用户组管理', 
            component: privilegeUser,
            children: [
              { path: '', redirect: to => { return 'manage' }, hidden: true } ,
              { path: 'manage', name: '用户组管理', component: privilegeUserManage, hidden: true }
            ]
          },
          { path: 'role', name: '角色管理', component: privilegeRole }
        ]  
      },
    ]
  }
];