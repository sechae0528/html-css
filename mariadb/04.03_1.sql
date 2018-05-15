insert
select
update
delete



select * from member order by name;
select * from member order by name desc;
select * from member order by authcode, name;
select count(*) from member where authcode = 3;
select * from basicsalary;
select sum(salary) from basicsalary;
select * from member;
select concat(id,":", name) from member;
select left(name, 2) from member;



-- 7. board 테이블에서 모든 글을 번호 오름차순으로 선택
select * from board order by no;

-- 8. board 테이블에서 모든 글을 번호 내림차순으로 선택
select * from board order by no desc;

-- 9. board 테이블에서 모든 글을 번호 오름차순, 작성일시 내림차순으로 선택
select * from board order by no, regDate desc;

-- 10. board테이블에서 모든 글을 번호 내림차순, 작성일시 오름차순으로 선택
select * from board order by no desc, regDate;

-- 11. member테이블에서 authcode가 2,3인 사람의 수
select count(*) from member where authcode = 2 or authcode = 3;

-- 12. member테이블에서 no가 1이상 7미만인 사람 중 authcode가 2인 사람의 수
select count(*) from member where no>=1 and no<7 and authcode = 2;

-- 13. member테이블에서 성만 가져오기
select left(name, 1) "성" from member;

-- 14. board테이블에서 '제목 : 내용' 을 '본문' 이라는 컬럼명으로 가져오기
select concat(title,":",content) '본문' from board;

-- 15. member 테이블에서 이름만 가져오기
select right(name, 2) 이름  from member;




-- update 테이블명 set 컬럼 = 변경값 where 조건

-- 1. member테이블에서 김태희 이름을 김태리로 이름 변경
update member set name = '김태리' where name = '김태희';

-- 2. member 테이블에서 조인성 email을 insung@naver.com으로 변경
update member set email = 'insung@naver.com' where name = '조인성';

-- 3. member 테이블에서 손예진, 최민식 authcode를 2로 변경
update member set authcode = 2 where name = '손예진' or name = '최민식';

-- 4. board 테이블에서 5번 글의 내용을 hello mariadb 로 변경
update board set content = 'hello mariadb' where no = 5;

-- 5. auth 테이블에서 authority 컬럼값의 예비회원을 승인대기로 변경
update auth set authority = '승인대기' where authority = '예비회원';


-- 다시 실행취소를 하고 싶을 때 사용 안전하게 하기 위해서
start transaction

delete from member

-- rollback이 실행되지 않음x 완전히 수정상태로 하고 싶을 때 사용
commit
-- transaction 실행 후 다시 원상복귀하고 싶을때  사용
rollback




-- 서브쿼리방법

-- 연봉의 최댓값을 먼저 찾은다음 그 사람의 포지션을 찾을 때,
select position from basicsalary
	where salary = (select max(salary) from basicsalary);

-- select * from member2 where position ='사원' or position = '과장'
select * from member2
	where position in ('사원', '과장');

-- 연봉이 7000이상인 사람들의 정보를 다 가져오기	
select * from member2 where position  in (select position from basicsalary where salary >= 7000);

	





































