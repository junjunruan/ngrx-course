import { Component, OnInit } from '@angular/core';
import {ThreadsService} from "../services/threads.service";
import { ApplicationState } from "../store/application-state";
import { Store } from "@ngrx/store";
import { LoadUserThreadsAction } from "../store/actions";
import { Observable } from "rxjs/Observable";
import { ThreadSummaryVM } from "./thread-summary.vm";


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

    userName$: Observable<string>;
    unreadMessageCounter$: Observable<number>;
    threadsSummaries$: observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService,
                private store: Store<ApplicationState>) {
      this.userName$ = store
          .skip(1)
          .map(this.mapStateToUserName);

      this.unreadMessageCounter$
	      .skip(1)
	      .map(this.mapStateToUnreadMessageCounter);

      this.threadsSummaries$ = store.select(this.stateToThreadSummariesSelector);
  }

    stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
        const threads = _.values<Thread>(state.storeData.threads);
        // map only accept one parameter, so we need to use _.partial
        return threads.map(_.partial(this.mapThreadToThreadSummary(), state));
    }

    mapThreadToThreadSummary(): ThreadSummaryVM {
        const names = _.keys(thread.participants).map(
            participantId => thread.participants[participantId].name
        );
        const lastMessageId = _.last(thread.messageIds);
        const lastMessage = state.StoreData.message[lastMessageId];

        return {
            id = thread.id,
            particitantNames = _.join(names, ','),
            lastMessageText = lastMessage.text,
            timeStamp: lastMessage.timestamp
        }
    }


  ngOnInit() {

        this.threadsService.loadUserThreads()
            .subscribe(
                allUserData => {
                  console.log(allUserData);
                  this.store.dispatch(
                      new LoadUserThreadsAction(allUserData)
                  )
                }
            );

  }

  mapStateToUserName(state: ApplicationState): string {
      return state.storeData.participants[state.uiState.userId].name;
  }

  mapStateToUnreadMessageCounter(state: ApplicationState): number {
      const currentUserId = state.uiState.currentThreadId;

      _.value<Thread>(state.storeData.threads)
          .reduce(
              (acc, thread) => {
                  return acc + threads.participants[currentUserId];
              }
              , 0);
  }

}
