<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@siteimprove/alfa-act](./alfa-act.md) &gt; [Interview](./alfa-act.interview.md) &gt; [conduct](./alfa-act.interview.conduct.md)

## Interview.conduct() function

<b>Signature:</b>

```typescript
function conduct<I, T, Q, A>(interview: Interview<Q, T, A>, rule: Rule<I, T, Q>, oracle: Oracle<Q>): Future<Option<A>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  interview | [Interview](./alfa-act.interview.md)<!-- -->&lt;Q, T, A&gt; |  |
|  rule | [Rule](./alfa-act.rule.md)<!-- -->&lt;I, T, Q&gt; |  |
|  oracle | [Oracle](./alfa-act.oracle.md)<!-- -->&lt;Q&gt; |  |

<b>Returns:</b>

[Future](./alfa-future.future.md)<!-- -->&lt;[Option](./alfa-option.option.md)<!-- -->&lt;A&gt;&gt;
